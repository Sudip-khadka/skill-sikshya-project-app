import React, { useState } from 'react';
import '../../TableHeader/Table.css';
import AppointmentHeader from '../../TableHeader/AppointmentHeader';
import EditAppointment from './EditAppointment';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import AddAppointment from '../Popups/AppointmentPopUp';

function ManageAppointments({ searchQuery, setSearchQuery,rowsPerPage,setRowsPerPage }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text-appointment">
          <Link to='/appointments'><IoMdArrowRoundBack /></Link>
          <h2> Manage Appointments</h2>
        </div>

        <div className="product-categories-header-btn">
          <button className='btn' onClick={openDialog}>+ Setup</button>
          <AddAppointment open={isDialogOpen} handleClose={closeDialog} />
        </div>
      </div>
      <div className="table">
        <AppointmentHeader setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/> {/* Pass setSearchQuery */}
        <div className="table-body">
          <EditAppointment searchQuery={searchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/> {/* Pass searchQuery */}
        </div>
      </div>
    </div>
  );
}

export default ManageAppointments;
