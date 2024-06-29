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
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from 'uuid';
import DatePickerValue from "../DatePicker";
import RadioPositionEnd from "../RadioGroup";

export default function AddCoupon({ open, handleClose, title, btnText, editedRow }) {
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
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div className="second-row-of-staff" style={{ flex: '1' }}>
            <h2>Coupon Code</h2>
            <Input
              sx={{ marginTop: "5px" }}
              size="lg"
              placeholder="CNX11002"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="service-fee" style={{ flex: '1' }}>
            <h2>Uses Limit</h2>
            <Input
              sx={{ marginTop: "5px" }}
              size="lg"
              placeholder="25"
              name="serviceFee"
              value={serviceFee}
              onChange={(e) => setServiceFee(e.target.value)}
            />
          </div>
        </Box>
        <h3>Select Date</h3>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DatePickerValue />
        </Box>
        <Box>
          <h3>Coupon Type</h3>
          <RadioPositionEnd value={couponType} onChange={(e) => setCouponType(e.target.value)} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <h3>Discount</h3>
          <Input
            sx={{ margin: "10px 0px" }}
            size="lg"
            placeholder="Discount amount or discount percentage"
            name="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
          <TextArea rows={5} placeholder="Write description here...." value={description} onChange={(e) => setDescription(e.target.value)} />
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
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
