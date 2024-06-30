import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LuCopy } from 'react-icons/lu';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function Banner() {
  const BannerApi = 'https://retoolapi.dev/bPk6hA/data';
  const [banners, setBanners] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [editBannerId, setEditBannerId] = useState(null); // State for tracking the banner being edited
  const [deleteBannerId, setDeleteBannerId] = useState(null); // State for tracking the banner being deleted

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(BannerApi);
        console.log(response.data);
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const copyText = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setOpenAlert(true);
        setTimeout(() => {
          setOpenAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  const handleEdit = (bannerId) => {
    setEditBannerId(bannerId); // Set the ID of the banner to be edited
    // Additional logic to open edit form or modal if needed
  };

  const handleDelete = async (bannerId) => {
    try {
      await axios.delete(`${BannerApi}/${bannerId}`); // Replace with your actual delete endpoint
      // Optionally update state or refresh data after successful deletion
      const updatedBanners = banners.filter((banner) => banner.id !== bannerId);
      setBanners(updatedBanners);
      setOpenAlert(true); // Show success alert for deletion
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div style={styles.container}>
      {banners.length > 0 ? (
        banners.map((banner) => (
          <div key={banner.id} style={styles.card}>
            <div style={styles.imageContainer}>
              <img src={banner.links} alt={`Banner ${banner.id}`} style={styles.image} />
              <p style={styles.position}>{banner.position}</p>
            </div>
            <div className="input-fields" style={styles.inputContainer}>
              <input type="text" value={banner.links} disabled style={styles.linkInput} />
              <div className="icon" style={styles.iconContainer} onClick={() => copyText(banner.links)}>
                <LuCopy style={styles.copyIcon} />
              </div>
            </div>
            <div className="editanddelete" style={styles.buttonContainer}>
              <Button variant="outlined" color="primary" style={styles.button} onClick={() => handleEdit(banner.id)}>
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={styles.button}
                onClick={() => setDeleteBannerId(banner.id)}
              >
                Delete
              </Button>
            </div>
            {/* Delete confirmation dialog */}
            <Snackbar
              open={deleteBannerId === banner.id}
              autoHideDuration={6000}
              onClose={() => setDeleteBannerId(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                severity="warning"
                sx={{ width: '100%' }}
                action={
                  <>
                    <Button color="inherit" size="small" onClick={() => setDeleteBannerId(null)}>
                      Cancel
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleDelete(banner.id);
                        setDeleteBannerId(null);
                      }}
                    >
                      Confirm Delete
                    </Button>
                  </>
                }
              >
                Are you sure you want to delete this banner?
              </Alert>
            </Snackbar>
          </div>
        ))
      ) : (
        <p>Loading banners...</p>
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
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    marginBottom: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  position: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#D6EBFB',
    padding: '5px 10px',
    borderRadius: '8px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  linkInput: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  iconContainer: {
    marginLeft: '10px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  copyIcon: {
    color: '#555',
    fontSize: '20px',
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

export default Banner;
