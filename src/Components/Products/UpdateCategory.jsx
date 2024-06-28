import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function UpdateCategory({ open, handleClose }) {
  const apiToPost = "https://retoolapi.dev/yd0z2S/data";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.category;

    try {
      await axios.post(apiToPost, { email });
      handleClose();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: {
          width: '500px', // Set a fixed width
          maxWidth: 'none', // Disable the maxWidth setting to use the fixed width
          padding: '20px', // Add padding for better spacing
        }
      }}
    >
      <DialogTitle>Category Name</DialogTitle>
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
        />
      </DialogContent>
      <DialogActions sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '10px',
        marginTop: '20px'
      }}>
        <Button type="submit" sx={{ width: '100%', color: 'white', background: '#082D4A', '&:hover': {
              backgroundColor: '#064a6a', // Darker shade on hover
            } }}>Create Category</Button>
        <Button onClick={handleClose} sx={{ width: '100%', color: 'red', border: '1px solid red' }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
