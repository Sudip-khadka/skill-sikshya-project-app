import React from 'react'
import RowsPicker from './RowsPicker'
import './Table.css'
import SearchAppBar from './SearchBar'
import DateRange from './DatePicker'
import PaymentStatus from './PaymentStatus'
import DeliveryStatus from './DeliveryStatus'

function OrderHeaders() {
  return (
    <div className='table-headers'>
        <div className="show-rows-per-page">
      <RowsPicker/>
        </div>
       <div className="search-containers">
       <div className="table-header-search">
            <SearchAppBar/>
        </div>
        <div className="date-picker">
          <DateRange/>
          
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
