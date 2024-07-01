import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const faqApi = 'https://retoolapi.dev/uVqRYF/faqs';

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [editFaqId, setEditFaqId] = useState(null);
  const [deleteFaqId, setDeleteFaqId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(faqApi);
        console.log(response.data);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (faqId) => {
    setEditFaqId(faqId);
  };

  const handleDelete = async (faqId) => {
    try {
      const deleteUrl = `${faqApi}/${faqId}`;
      console.log('Delete URL:', deleteUrl);

      await axios.delete(deleteUrl);

      const updatedFaqs = faqs.filter((faq) => faq.id !== faqId);
      setFaqs(updatedFaqs);

      setOpenAlert(true);
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting FAQ:', error.response ? error.response.data : error.message);
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > 43) {
      return words.slice(0, 43).join(' ') + '...';
    }
    return text;
  };

  return (
    <div style={styles.container}>
      {faqs.length > 0 ? (
        faqs.map((faq) => (
          <div key={faq.id} style={styles.card}>
            <div className="faq-title">
              <h4>{faq.title}</h4>
            </div>
              <div style={{marginTop:"10px"}}
                dangerouslySetInnerHTML={{
                  __html: truncateText(faq.description, 45),
                }}
              />
            <div className="editanddelete" style={styles.buttonContainer}>
              <Button variant="outlined" color="primary" style={styles.button} onClick={() => handleEdit(faq.id)}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={styles.button}
                onClick={() => setDeleteFaqId(faq.id)}
              >
                Delete
              </Button>
            </div>
            <Snackbar
              open={deleteFaqId === faq.id}
              autoHideDuration={6000}
              onClose={() => setDeleteFaqId(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                severity="warning"
                sx={{ width: '100%' }}
                action={
                  <>
                    <Button color="inherit" size="small" onClick={() => setDeleteFaqId(null)}>
                      Cancel
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleDelete(faq.id);
                        setDeleteFaqId(null);
                      }}
                    >
                      Confirm Delete
                    </Button>
                  </>
                }
              >
                Are you sure you want to delete this FAQ?
              </Alert>
            </Snackbar>
          </div>
        ))
      ) : (
        <p>Loading Faqs...</p>
      )}

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Action completed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px',
    gap: '20px',
    justifyContent: 'space-between',
  },
  card: {
    width: 'calc(33.333% - 20px)',
    boxSizing: 'border-box',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    backgroundColor: '#fff',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    flex: '1',
    margin: '0 5px',
  },
};

export default FAQs;
