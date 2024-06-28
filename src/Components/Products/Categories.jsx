import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormDialog from '../Popups/CategoryPopUP';
import './Products.css';

function Categories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const apiToFetchCategories = "https://retoolapi.dev/yd0z2S/data";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiToFetchCategories);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openEditDialog = (category) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedCategory(null);
    setIsEditDialogOpen(false);
  };

  const openConfirmDialog = (categoryId) => {
    setCategoryToDelete(categoryId);
    setIsConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setCategoryToDelete(null);
    setIsConfirmDialogOpen(false);
  };

  const handleAddProduct = (categoryId) => {
    console.log(`Add product to category with id: ${categoryId}`);
    // Implement your logic to add products to the category here
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await axios.delete(`${apiToFetchCategories}/${categoryToDelete}`);
        setCategories(categories.filter(category => category.id !== categoryToDelete));
        closeConfirmDialog();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className='product-categories'>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Categories</h1>
          <p>Add, edit or delete a category</p>
        </div>
        <div className="product-categories-header-btn">
          <button className='btn' variant="contained" onClick={openDialog}>+ Create Categories</button>
        </div>
        <FormDialog open={isDialogOpen} handleClose={closeDialog} />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map(category => (
              <TableRow key={category.id}>
                <TableCell>{category.categories || category.email}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => openEditDialog(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleAddProduct(category.id)}>
                    <span>Add Products</span>
                  </IconButton>
                  <IconButton color="error" onClick={() => openConfirmDialog(category.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedCategory && (
        <FormDialog
          open={isEditDialogOpen}
          handleClose={closeEditDialog}
          category={selectedCategory}
        />
      )}
      <Dialog open={isConfirmDialogOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this category?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteCategory} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Categories;
