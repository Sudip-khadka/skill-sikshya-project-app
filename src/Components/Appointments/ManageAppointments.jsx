import React, { useState } from 'react';
import '../../TableHeader/Table.css';
import AppointmentHeader from '../../TableHeader/AppointmentHeader';
import EditAppointment from './EditAppointment';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import AddAppointment from '../Popups/AppointmentPopUp';

function ManageAppointments({ searchQuery, setSearchQuery, rowsPerPage, setRowsPerPage,dateRange,setDateRange }) {
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
        <div className="product-categories-header-text-appointment">
          <Link to='/appointments'><IoMdArrowRoundBack /></Link>
          <h2> Manage Appointments</h2>
        </div>

        <div className="product-categories-header-btn">
          <button className='btn' onClick={() => openDialog('Setup Appointment', 'Add')}>+ Setup</button>
          <AddAppointment
            open={isDialogOpen}
            handleClose={closeDialog}
            title={dialogTitle}
            btnText={dialogButtonText}
            editedRow={editedRow}
          />
        </div>
      </div>
      <div className="table">
        <AppointmentHeader setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange}/>
        <div className="table-body">
          <EditAppointment
            searchQuery={searchQuery}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setIsDialogOpen={openDialog} // Pass openDialog with parameters
            dateRange={dateRange}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageAppointments;
