import React from 'react'
import RowsPicker from './RowsPicker'
import './Table.css'
import SearchAppBar from './SearchBar'
import DateRange from './DatePicker'
import PaymentStatus from './PaymentStatus'
import DeliveryStatus from './DeliveryStatus'

function OrderHeaders({rowsPerPage,setRowsPerPage,setSearchQuery,setDateRange}) {
  return (
    <div className='table-headers'>
        <div className="show-rows-per-page">
        <RowsPicker rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
        </div>
       <div className="search-containers">
       <div className="table-header-search">
       <SearchAppBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="date-picker">
        <DateRange setDateRange={setDateRange} />
          
        </div>
        <div className="delivery-status">
        <DeliveryStatus/>
        </div>
        <div className="payment-status">
        <PaymentStatus/>
        </div>
       </div>
    </div>
  )
}

export default OrderHeaders
