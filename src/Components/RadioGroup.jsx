import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { css } from '@emotion/react'; // Import this to use CSS in JS

// Define the styles to override the margin
const overrideMargin = css`
  .marginClass {
    margin-block-start: 0 !important;
  }
`;

export default function RadioPositionEnd() {
  return (
    <RadioGroup aria-label="Your plan" name="people" defaultValue="Flat Discount" sx={{ width: '100%' }}>
      <List
        css={overrideMargin} // Apply the CSS to override margin
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: '20px',
          minWidth: 240,
          '--List-gap': '0.5rem',
          '--ListItem-paddingY': '1rem',
          '--ListItem-radius': '8px',
          '--ListItemDecorator-size': '32px',
        }}
      >
        {['Flat Discount', 'Percentage'].map((item, index) => (
          <ListItem variant="outlined" key={item} sx={{ flexGrow: 1, boxShadow: 'sm', display: 'flex', alignItems: 'center',}}>
            <Radio
              overlay
              value={item}
              label={item}
              className="marginClass" // Assuming this is the class adding the margin
              sx={{ flex: 1, flexDirection: 'row-reverse',}}
              slotProps={{
                action: ({ checked }) => ({
                  sx: (theme) => ({
                    ...(checked && {
                      inset: -1,
                      border: '2px solid',
                      borderColor: theme.vars.palette.primary[500],
                    }),
                  }),
                }),
              }}
            />
          </ListItem>
        ))}
      </List>
    </RadioGroup>
  );
}
