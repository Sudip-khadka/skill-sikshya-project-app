import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CouponStatus({couponStatus,setCouponStatus}) {

  const handleChange = (event) => {
    setCouponStatus(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={couponStatus}
          onChange={handleChange}
          autoWidth
          label="Coupon Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'expired'}>Expired</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
