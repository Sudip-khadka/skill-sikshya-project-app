import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AppointmentStatus() {
  const [appointmentStatus, setAppointmentStatus] = React.useState('');

  const handleChange = (event) => {
    setAppointmentStatus(event.target.value);
  };
  const getColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'pending':
        return 'blue';
      case 'canceled':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={appointmentStatus}
          onChange={handleChange}
          autoWidth
          label="Appointment Status"
          sx={{
            color: getColor(appointmentStatus),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(appointmentStatus),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(appointmentStatus),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(appointmentStatus),
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'confirmed'}>Confirmed</MenuItem>
          <MenuItem value={'pending'}>Did Not Answer</MenuItem>
          <MenuItem value={'canceled'}>Canceled</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
