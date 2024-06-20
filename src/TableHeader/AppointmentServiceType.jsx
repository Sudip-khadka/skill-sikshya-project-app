import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AppointmentServiceStatus() {
  const [deliveryStatus, setDeliveryStatus] = React.useState('');

  const handleChange = (event) => {
    setDeliveryStatus(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Service Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={deliveryStatus}
          onChange={handleChange}
          autoWidth
          label="Delivery Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'delivered'}>Site Visit</MenuItem>
          <MenuItem value={'pending'}>Wholesell Orders</MenuItem>
          <MenuItem value={'shipped'}>Quality Checking</MenuItem>
          <MenuItem value={'inprogress'}>Custom Orders</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
