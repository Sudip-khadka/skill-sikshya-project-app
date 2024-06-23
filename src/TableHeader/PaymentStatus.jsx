import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function PaymentStatus() {
  const [paymentStatus, setPaymentStatus] = React.useState('');

  const handleChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  // Define colors based on payment status
  const getColor = (status) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'cod':
        return 'blue';
      case 'refunded':
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{ color: getColor(paymentStatus) }}
        >
          Payment Status
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={paymentStatus}
          onChange={handleChange}
          autoWidth
          label="Payment Status"
          sx={{
            color: getColor(paymentStatus),
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(paymentStatus),
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(paymentStatus),
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: getColor(paymentStatus),
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'paid'}>Paid</MenuItem>
          <MenuItem value={'cod'}>COD</MenuItem>
          <MenuItem value={'refunded'}>Refunded</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
