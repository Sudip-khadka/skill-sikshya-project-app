import React, { useState } from 'react'
import '../../TableHeader/Table.css'
import AppointmentHeader from '../../TableHeader/AppointmentHeader'
import AppointentBody from '../../TableBody/ApointmentTable'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

function ManageAppointments() {
   
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h3><IoMdArrowRoundBack /> Manage Apointments</h3>
        </div>
        
        <div className="product-categories-header-btn">
          <Link to='/manageappointments'><button className='btn'>Manage Appointments</button></Link>
        </div>
      </div>
      <div className="table">

      <AppointmentHeader/>
      <div className="table-body">
        <AppointentBody/>
      </div>
      </div>
    </div>
  )
}

export default ManageAppointments
