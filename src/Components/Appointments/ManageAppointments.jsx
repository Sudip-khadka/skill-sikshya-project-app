import React, { useState } from 'react'
import '../../TableHeader/Table.css'
import AppointmentHeader from '../../TableHeader/AppointmentHeader'
import EditAppointment from './EditAppointment'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import AddAppointment from '../Popups/AppointmentPopUp'

function ManageAppointments() {
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
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text-appointment">
        <Link to='/appointments'><IoMdArrowRoundBack /></Link>
          <h2> Manage Apointments</h2>
        </div>
        
        <div className="product-categories-header-btn">
          <button className='btn' onClick={openDialog}>+ Setup</button>
          <AddAppointment open={isDialogOpen} handleClose={closeDialog} />
        </div>
      </div>
      <div className="table">

      <AppointmentHeader/>
      <div className="table-body">
        <EditAppointment/>
      </div>
      </div>
    </div>
  )
}

export default ManageAppointments
