import React from 'react';
import BasicSelect from './RowsPicker';
import './Table.css';
import SearchAppBar from './SearchBar';
import DateRange from './DatePicker';
import AppointmentStatus from './AppointmentStatus';
import AppointmentServiceStatus from './AppointmentServiceType';

function AppointmentHeader({ setSearchQuery ,rowsPerPage,setRowsPerPage}) {
  return (
    <div className='table-headers'>
      <div className="show-rows-per-page">
        <BasicSelect rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      </div>
      <div className="search-containers">
        <div className="table-header-search">
          <SearchAppBar setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery */}
        </div>
        <div className="date-picker">
          <DateRange />
        </div>
        <div className="delivery-status">
          <AppointmentServiceStatus />
        </div>
        <div className="payment-status">
          <AppointmentStatus />
        </div>
      </div>
    </div>
  );
}

export default AppointmentHeader;
