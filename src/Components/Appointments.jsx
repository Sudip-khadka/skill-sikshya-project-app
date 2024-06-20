import React from 'react'
import '../TableHeader/Table.css'
import AppointmentHeader from '../TableHeader/AppointmentHeader'

function Appointments() {
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Appointments</h1>
          <p>View All Appointments</p>
        </div>
        
        <div className="product-categories-header-btn">
          <button className='btn'>Manage Appointments</button>
        </div>
      </div>
      <div className="table">

      <AppointmentHeader/>
      </div>
    </div>
  )
}

export default Appointments
