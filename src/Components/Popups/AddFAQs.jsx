import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Input,TextField  } from "@mui/material";

import { styled } from "@mui/material/styles";
import { Alert } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

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
  const faqApi = 'https://retoolapi.dev/uVqRYF/faqs'
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'align': [] }],
    ],
  };
  
  const formats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align'
  ];
  
  export default function AddFAQs({ open, handleClose, title, btnText, editedRow }) {
    const [titleInput, setTitleInput] = useState(editedRow?.title || '');
    const [description, setDescription] = useState(editedRow?.description || '');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    
    useEffect(() => {
      if (editedRow) {
        setTitleInput(editedRow.title);
        setDescription(editedRow.description);
      }
    }, [editedRow]);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!titleInput || !description) {
        alert("Please fill in all fields.");
        return;
      }
  
      const formData = {
        title: titleInput,
        description:description,
      };
      try {
        const response = await axios.post(faqApi, formData);
        console.log(response.data);
        setShowSuccessAlert({ visible: true, type: 'success', message: `${title} Successful` });
        setTimeout(() => {
          setShowSuccessAlert({ visible: false, type: '', message: '' });
          handleClose();
        }, 3000);
      } catch (error) {
        console.error("There was an error adding the banner data!", error);
        setShowSuccessAlert({ visible: true, type: 'error', message: 'There was an error adding the banner data!' });
      }
  
      console.log(formData);
  
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        handleClose();
      }, 3000);
    };
  
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
          <Box sx={{ width: '100%' }}>
            <h3>Title</h3>
            <Input
              fullWidth
              size="medium"
              variant=''
              placeholder="Title Goes Here"
              name="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <h3>Description</h3>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              placeholder="Description goes here"
              style={{ height: '200px' }}
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
            {btnText ? btnText : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  