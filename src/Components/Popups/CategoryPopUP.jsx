import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose, onSubmit, category }) {
  const [formValues, setFormValues] = useState({
    category: '',
  });

  useEffect(() => {
    if (category) {
      setFormValues({ category: category.email || category.category || '' });
    } else {
      setFormValues({ category: '' });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: {
          width: '500px',
          maxWidth: 'none',
          padding: '20px',
        },
      }}
    >
      <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="category"
          name="category"
          label="For Eg:- Electronics"
          type="text"
          fullWidth
          variant="standard"
          value={formValues.category}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: '10px',
          marginTop: '20px',
        }}
      >
        <Button
          type="submit"
          sx={{
            width: '100%',
            color: 'white',
            background: '#082D4A',
            '&:hover': {
              backgroundColor: '#064a6a',
            },
          }}
        >
          {category ? 'Update Category' : 'Create Category'}
        </Button>
        <Button onClick={handleClose} sx={{ width: '100%', color: 'red', border: '1px solid red' }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
