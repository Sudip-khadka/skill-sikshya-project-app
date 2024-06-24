import React, { useState } from 'react'
import '../../TableHeader/Table.css'
import AppointmentHeader from '../../TableHeader/AppointmentHeader'
import EditAppointment from './EditAppointment'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

function ManageAppointments() {
   
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text-appointment">
        <Link to='/appointments'><IoMdArrowRoundBack /></Link>
          <h2> Manage Apointments</h2>
        </div>
        
        <div className="product-categories-header-btn">
          <button className='btn'>+ Setup</button>
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
