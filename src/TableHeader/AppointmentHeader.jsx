import React, { useContext } from 'react';
import './Table.css';
import SearchAppBar from './SearchBar';
import DateRange from './DatePicker';
import AppointmentStatus from './AppointmentStatus';
import AppointmentServiceStatus from './AppointmentServiceType';
import { SearchContext } from '../Components/Context/StateManagement';
import RowsPicker from './RowsPicker';

function AppointmentHeader({rowsPerPage,setRowsPerPage,setSearchQuery,setDateRange}) {
  return (
    <div className='table-headers'>
      <div className="show-rows-per-page">
        <RowsPicker rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      </div>
      <div className="search-containers">
        <div className="table-header-search">
          <SearchAppBar setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery */}
        </div>
        <div className="date-picker">
          <DateRange setDateRange={setDateRange} />
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
