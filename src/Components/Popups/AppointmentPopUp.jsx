import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';

export default function AddAppointment({ open, handleClose }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.category;
    const imageFile = formData.get('image');
    console.log(email, imageFile);
    handleClose();
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: {
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '40%',
          maxWidth: 'none',
          padding: '20px',
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center' }}>Setup Appointment</DialogTitle>
      <DialogContent sx={{width:'100%'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column',}}>
          
            <h2>Service Type</h2>
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="appointment"
            name="category"
            label="For Eg:- Hair Cutting"
            type="text"
            fullWidth
            variant="standard"
          /></Box>
          <Box sx={{width:'100%', display: 'flex',flexDirection:'column', gap: '10px',marginTop:'10px'}}>
            <div className="add-slots" style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
            <h2>Add Slots</h2>
            <h3>+ Add More Slots</h3>
            </div>
            <div className="time">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['MultiInputTimeRangeField', 'SingleInputTimeRangeField']}
      >
        <MultiInputTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'From' : 'To',
            }),
          }}
        />
        
      </DemoContainer>
    </LocalizationProvider>
            </div>
          </Box>
          <Box>
          <Button
            sx={{
              width: '100%',
              color: '#082D4A',
              border: '3px dotted #082D4A',
              borderRadius: '8px',
              height: '150px',
              background: '#D6EBFB',
              '&:hover': {
                color: '#D6EBFB',
                backgroundColor: '#082D4A',
              }
            }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload file
            <VisuallyHiddenInput type="file" name="image" />
          </Button>
            </Box>
        
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
        <Button
          type="submit"
          sx={{
            width: '100%',
            color: 'white',
            background: '#082D4A',
            '&:hover': {
              backgroundColor: '#064a6a',
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
