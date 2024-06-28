import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CouponType({coupon,setCoupon}) {

  const handleChange = (event) => {
    setCoupon(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Coupon Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={coupon}
          onChange={handleChange}
          autoWidth
          label="Coupon Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'flatType'}>Flat Discount</MenuItem>
          <MenuItem value={'percentage'}>Percentage</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
