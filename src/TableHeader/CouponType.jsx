import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CouponType() {
  const [couponType, setCouponType] = React.useState('');

  const handleChange = (event) => {
    setCouponType(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Coupon Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={couponType}
          onChange={handleChange}
          autoWidth
          label="Coupon Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'flatType'}>Flat Discount</MenuItem>
          <MenuItem value={'percentage'}>Precentage</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
