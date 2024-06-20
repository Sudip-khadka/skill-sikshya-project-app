import React from 'react'
import BasicSelect from './RowsPicker'
import './Table.css'
import SearchAppBar from './SearchBar'
import DateRange from './DatePicker'
import CouponStatus from './CouponStatus'
import CouponType from './CouponType'

function CouponHeader() {
  return (
    <div className='table-headers'>
        <div className="show-rows-per-page">
      <BasicSelect/>
        </div>
       <div className="search-containers">
       <div className="table-header-search">
            <SearchAppBar/>
        </div>
        <div className="date-picker">
          <DateRange/>
          
        </div>
        <div className="delivery-status">
        <CouponType/>
        </div>
        <div className="payment-status">
        <CouponStatus/>
        </div>
       </div>
    </div>
  )
}

export default CouponHeader
