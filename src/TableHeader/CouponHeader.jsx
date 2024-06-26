import React from 'react'
import BasicSelect from './RowsPicker'
import './Table.css'
import SearchAppBar from './SearchBar'
import DateRange from './DatePicker'
import CouponStatus from './CouponStatus'
import CouponType from './CouponType'

function CouponHeader({rowsPerPage,setRowsPerPage,setSearchQuery,setDateRange,setCoupon,coupon,couponStatus,setCouponStatus}) {
  return (
    <div className='table-headers'>
        <div className="show-rows-per-page">
        <BasicSelect rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
        </div>
       <div className="search-containers">
       <div className="table-header-search">
       <SearchAppBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="date-picker">
        <DateRange setDateRange={setDateRange} />
          
        </div>
        <div className="delivery-status">
        <CouponType coupon={coupon} setCoupon={setCoupon}/>
        </div>
        <div className="payment-status">
        <CouponStatus setCouponStatus={setCouponStatus} couponStatus={couponStatus}/>
        </div>
       </div>
    </div>
  )
}

export default CouponHeader
