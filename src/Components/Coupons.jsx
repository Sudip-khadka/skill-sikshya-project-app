import React, { useContext, useState } from 'react'
import CouponHeader from '../TableHeader/CouponHeader'
import CouponTable from '../TableBody/CouponTable'
import { SearchContext } from './Context/StateManagement'
import AddCoupon from './Popups/CouponPopup';

function Coupons() {
  const {searchQuery, setSearchQuery ,rowsPerPage,dateRange,setDateRange,setRowsPerPage} = useContext(SearchContext);
  const [coupon,setCoupon] = useState("");
  const [couponStatus,setCouponStatus] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('Setup Appointment');
  const [dialogButtonText, setDialogButtonText] = useState('Add');
  const [editedRow, setEditedRow] = useState(null);

  const openDialog = (title, buttonText, rowData = null) => {
    setDialogTitle(title);
    setDialogButtonText(buttonText);
    setEditedRow(rowData);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Coupon</h1>
          <p>Create Coupon Code</p>
        </div>
        <div className="product-categories-header-btn">
          <button className='btn' onClick={()=>openDialog('Create New Coupon', 'Create')}>+ Create New Coupon</button>
          <AddCoupon
            open={isDialogOpen}
            handleClose={closeDialog}
            title={dialogTitle}
            btnText={dialogButtonText}
            editedRow={editedRow}
          />
        </div>
      {/* Pass the state and handlers to the FormDialog component */}
      </div>
      <div className="table">
    <CouponHeader setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange} coupon={coupon} setCoupon={setCoupon} setCouponStatus={setCouponStatus} couponStatus={couponStatus} />
      <div className="table-body">
      <CouponTable
  searchQuery={searchQuery}
  rowsPerPage={rowsPerPage}
  setRowsPerPage={setRowsPerPage}
  dateRange={dateRange}
  setDateRange={setDateRange}
  coupon={coupon}
  setCoupon={setCoupon}
  couponStatus={couponStatus}
  setCouponStatus={setCouponStatus}
  setIsDialogOpen={setIsDialogOpen}
  setDialogTitle={setDialogTitle}
  openDialog={openDialog} // Pass the openDialog function here
/>
      </div>

      </div>
    </div>
  )
}

export default Coupons
