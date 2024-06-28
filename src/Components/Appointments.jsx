import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../TableHeader/Table.css';
import AppointmentHeader from '../TableHeader/AppointmentHeader';
import AppointmentBody from '../TableBody/ApointmentTable';
import ManageAppointments from './Appointments/ManageAppointments';
import { SearchContext } from './Context/StateManagement';

function Appointments() {
  const location = useLocation();
  const isManageAppointments = location.pathname === '/appointments/manageappointments';

  const { searchQuery, setSearchQuery, rowsPerPage, setRowsPerPage, dateRange, setDateRange } = useContext(SearchContext);

  return (
    <div>
      {!isManageAppointments ? (
        <>
          <div className="product-categories-header">
            <div className="product-categories-header-text">
              <h1>Appointments</h1>
              <p>View All Appointments</p>
            </div>
            <div className="product-categories-header-btn">
              <Link to='/appointments/manageappointments'>
                <button className='btn'>Manage Appointments</button>
              </Link>
            </div>
          </div>
          <div className="table">
          <AppointmentHeader setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange}/> {/* Pass setSearchQuery */}
            <div className="table-body">
              <AppointmentBody searchQuery={searchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange}/> {/* Pass rowsPerPage and setRowsPerPage */}
            </div>
          </div>
        </>
      ) : (
        <ManageAppointments setSearchQuery={setSearchQuery} searchQuery={searchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange}/>
      )}
    </div>
  )
}

export default Appointments;
