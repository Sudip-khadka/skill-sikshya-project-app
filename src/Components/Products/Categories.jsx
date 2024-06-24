import React, { useState } from 'react';
import './Products.css';
import FormDialog from '../Popups/CategoryPopUP';

function Categories() {
  // Define state to control the visibility of the FormDialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className='product-categories'>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Categories</h1>
          <p>Add, edit or delete a category</p>
        </div>
        <div className="product-categories-header-btn">
          <button className='btn' onClick={openDialog}>+ Create Categories</button>
        </div>
      <FormDialog open={isDialogOpen} handleClose={closeDialog} />
      {/* Pass the state and handlers to the FormDialog component */}
      </div>
      <div className="table">

      

      </div>
    </div>
  );
}

export default Categories;
