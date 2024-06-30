import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import { Alert } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { css } from '@emotion/react'; // Import this to use CSS in JS
import { FiUploadCloud } from "react-icons/fi";
// Define the styles to override the margin
const overrideMargin = css`
  .marginClass {
    margin-block-start: 0 !important;
  }
`;

export default function AddPrivacyPolicy({ open, handleClose, title, btnText, editedRow }) {
  const [uploadedImage, setUploadedImage] = useState(editedRow?.uploadedImage || null);
  const [timeSlots, setTimeSlots] = useState(editedRow?.timeSlots || [{ id: uuidv4(), from: "", to: "" }]);
  const [code, setCode] = useState(editedRow?.code || '');
  const [serviceFee, setServiceFee] = useState(editedRow?.serviceFee || '');
  const [couponType, setCouponType] = useState(editedRow?.couponType || 'Flat Discount');
  const [discount, setDiscount] = useState(editedRow?.discount || '');
  const [description, setDescription] = useState(editedRow?.description || '');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (editedRow) {
      setCode(editedRow.code);
      setServiceFee(editedRow.serviceFee);
      setUploadedImage(editedRow.uploadedImage);
      setTimeSlots(editedRow.timeSlots || [{ id: uuidv4(), from: "", to: "" }]);
      setCouponType(editedRow.couponType);
      setDiscount(editedRow.discount);
      setDescription(editedRow.description);
    }
  }, [editedRow]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleAddMoreSlots = () => {
    setTimeSlots([
      ...timeSlots,
      { id: uuidv4(), from: "", to: "" },
    ]);
  };

  const handleDeleteSlot = (id) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!code || !serviceFee || !uploadedImage || !discount) {
      alert("Please fill in all fields and upload a valid image file.");
      return;
    }

    const formData = {
      code,
      serviceFee,
      uploadedImage,
      timeSlots,
      couponType,
      discount,
      description
    };

    console.log(formData);

    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      handleClose();
    }, 3000);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "40%",
          maxWidth: "none",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
      <hr/>
      <DialogContent sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        
        <Box>
          <h3>Choose Banner Position</h3>
          <RadioGroup aria-label="Your plan" name="people" defaultValue="Middle" sx={{ width: '100%' }}>
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
        {['Top', 'Middle','Bottom'].map((item, index) => (
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
        </Box>
        <Box>
          {uploadedImage ? (
            <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
              <img
                src={uploadedImage}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
              <Button
                onClick={handleRemoveImage}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  minWidth: "auto",
                  padding: "5px",
                  background: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "50%",
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </Button>
            </Box>
          ) : (
            <Button
              sx={{
                marginTop: "20px",
                width: "100%",
                color: "#082D4A",
                border: "3px dotted #082D4A",
                borderRadius: "8px",
                height: "150px",
                background: "#D6EBFB",
                display:'flex',
                flexDirection:'column',
                "&:hover": {
                  color: "#D6EBFB",
                  backgroundColor: "#082D4A",
                },
              }}
              component="label"
              variant="contained"
              startIcon={<FiUploadCloud style={{ marginBottom: "8px" }} />}
            >
              Upload Image
              <VisuallyHiddenInput type="file" name="image" accept="image/*" onChange={handleImageUpload} />
            </Button>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <h3>Add Image Link</h3>
          <Input
            sx={{ margin: "10px 0px" }}
            size="lg"
            placeholder="Discount amount or discount percentage"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
         
        </Box>
        {showSuccessAlert && <Box sx={{ position: "absolute", top: '80%', width: '80%', left: '8.5%' }}><Alert message={`${title} Successful`} type="success" showIcon /></Box>}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          type="submit"
          sx={{
            width: "100%",
            color: "white",
            background: "#082D4A",
            "&:hover": {
              backgroundColor: "#064a6a",
            },
          }}
        >
          {btnText? btnText : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
