import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Input from "@mui/joy/Input";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputTimeRangeField";
import { v4 as uuidv4 } from 'uuid';  // Import the UUID package
import { Alert } from 'antd';

export default function AddAppointment({ open, handleClose }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [timeSlots, setTimeSlots] = useState([{ id: uuidv4(), from: "", to: "" }]);
  const [staff, setStaff] = useState('');
  const [serviceFee, setServiceFee] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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

    if (!staff || !serviceFee || !uploadedImage) {
      alert("Please fill in all fields and upload a valid image file.");
      return;
    }

    const formData = {
      staff,
      serviceFee,
      uploadedImage,
      timeSlots
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
      <DialogTitle sx={{ textAlign: "center" }}>Setup Appointment</DialogTitle>
      <DialogContent sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <h2>Service Type</h2>
          <Input
            sx={{ marginTop: "5px" }}
            size="lg"
            placeholder="Hair Cutting & Styling"
            name="serviceType"
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <div
            className="add-slots"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2>Add Slots</h2>
            <h3 style={{ color: "#082D4A", cursor: 'pointer' }} onClick={handleAddMoreSlots}>
              + Add More Slots
            </h3>
          </div>
          <div className="time">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "MultiInputTimeRangeField",
                  "SingleInputTimeRangeField",
                ]}
              >
                {timeSlots.map((slot, index) => (
                  <Box
                    key={slot.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <MultiInputTimeRangeField
                      slotProps={{
                        textField: ({ position }) => ({
                          label:
                            position === "start"
                              ? `From Slot ${index + 1}`
                              : `To Slot ${index + 1}`,
                        }),
                      }}
                    />
                    {timeSlots.length > 1 && (
                      <Button
                        onClick={() => handleDeleteSlot(slot.id)}
                        sx={{ minWidth: "auto" }}
                      >
                        <DeleteIcon sx={{color:'red'}}/>
                      </Button>
                    )}
                  </Box>
                ))}
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div className="second-row-of-staff" style={{ flex: '1' }}>
            <h2>No.of Available Staff</h2>
            <Input
              sx={{ marginTop: "5px" }}
              size="lg"
              placeholder="10"
              name="staff"
              value={staff}
              onChange={(e) => setStaff(e.target.value)}
            />
          </div>
          <div className="service-fee" style={{ flex: '1' }}>
            <h2>Service Fee</h2>
            <Input
              sx={{ marginTop: "5px" }}
              size="lg"
              placeholder="NRs. 25000"
              name="serviceFee"
              value={serviceFee}
              onChange={(e) => setServiceFee(e.target.value)}
            />
          </div>
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
                "&:hover": {
                  color: "#D6EBFB",
                  backgroundColor: "#082D4A",
                },
              }}
              component="label"
              variant="contained"
            >
              Upload Image
              <VisuallyHiddenInput type="file" name="image" accept="image/*" onChange={handleImageUpload} />
            </Button>
          )}
        </Box>
        {showSuccessAlert && <Box sx={{position:"absolute", top:'80%', width:'80%',left:'8.5%'}}><Alert message="Appointment Added Sucessfully" type="success" showIcon/></Box>}
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
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
