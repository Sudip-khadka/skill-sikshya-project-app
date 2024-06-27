import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RowsPicker({ rowsPerPage, setRowsPerPage }) {
  const handleChange = (event) => {
    const value = event.target.value;
    setRowsPerPage(value); // Update rowsPerPage in parent component
  };

  return (
    <div className='show-rows-per-page'>
      <p className='label'>Show</p>
      <FormControl sx={{ m: 1, minWidth: 40 }} style={{ width: '70px' }}>
        <InputLabel id="demo-simple-select-autowidth-label">Rows</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={rowsPerPage}
          onChange={handleChange}
          autoWidth
          label="Rows Select"
          style={{ width: '70px' }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <p className='label'>Per Pages</p>
    </div>
  );
}
