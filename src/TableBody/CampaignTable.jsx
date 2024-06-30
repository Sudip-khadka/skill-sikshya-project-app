import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ColorTabs({ onTabChange }) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
        sx={{
          width: '100%',
          '& .MuiTabs-indicator': {
            backgroundColor: '#082D4A',
            width: '100%',
          },
          '& .MuiTab-root': {
            color: '#B0BEC5',
            '&.Mui-selected': {
              color: '#082D4A',
            },
          },
          '& .MuiTabs-flexContainer': {
            borderBottom: '2px solid #D6EBFB',
          },
        }}
        TabIndicatorProps={{
          style: {
            height: '4px',
          },
        }}
      >
        <Tab value="one" label="Banner" sx={{ flex: 1 }} />
        <Tab value="two" label="Policies" sx={{ flex: 1 }} />
        <Tab value="three" label="FAQ's" sx={{ flex: 1 }} />
      </Tabs>
    </Box>
  );
}
