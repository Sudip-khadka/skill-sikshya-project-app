import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function ControlledSwitches({checked}) {
  const [check, setCheck] = React.useState(true);

  const handleChange = (event) => {
    setCheck(event.target.checked);
  };

  return (
    <Switch
      checked={check}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}