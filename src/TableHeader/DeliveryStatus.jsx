import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DeliveryStatus() {
  const [deliveryStatus, setDeliveryStatus] = React.useState('');

  const handleChange = (event) => {
    setDeliveryStatus(event.target.value);
  };
  const getColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'green';
      case 'pending':
        return 'blue';
      case 'canceled':
        return 'red';
      case 'shipped':
        return '#FF785A';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel 
        id="demo-simple-select-autowidth-label"
        sx={{ color: getColor(deliveryStatus) }}>Delivery Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={deliveryStatus}
          onChange={handleChange}
          autoWidth
          label="Delivery Status"
          sx={{
            color: getColor(deliveryStatus),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(deliveryStatus),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(deliveryStatus),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(deliveryStatus),
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'delivered'}>Delivered</MenuItem>
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'shipped'}>Shipped</MenuItem>
          <MenuItem value={'inprogress'}>In Progress</MenuItem>
          <MenuItem value={'canceled'}>Canceled</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
