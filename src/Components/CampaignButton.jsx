import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ addTitle,onClick  }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      onClick={onClick}
      tabIndex={-1}
      sx={{
        marginTop: "20px",
        width: "25%",
        color: "#082D4A",
        border: "3px dotted #082D4A",
        borderRadius: "8px",
        height: "70px",
        background: "#D6EBFB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          color: "#D6EBFB",
          backgroundColor: "#082D4A",
        },
      }}
      startIcon={<FaPlus style={{ marginBottom: "8px" }} />}
    >
      {addTitle}
    </Button>
  );
}
