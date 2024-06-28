import React, { useContext, useState } from 'react'
import CouponHeader from '../TableHeader/CouponHeader'
import CouponTable from '../TableBody/CouponTable'
import { SearchContext } from './Context/StateManagement'

function Coupons() {
  const {searchQuery, setSearchQuery ,rowsPerPage,dateRange,setDateRange,setRowsPerPage} = useContext(SearchContext);
  const [coupon,setCoupon] = useState("");

  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Coupon</h1>
          <p>Create Coupon Code</p>
        </div>
        <div className="product-categories-header-btn">
          <button className='btn' >+ Create New Coupon</button>
        </div>
      {/* Pass the state and handlers to the FormDialog component */}
      </div>
      <div className="table">
    <CouponHeader setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange} coupon={coupon} setCoupon={setCoupon} />
      <div className="table-body">
      <CouponTable searchQuery={searchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} coupon={coupon} setCoupon={setCoupon}/>
      </div>

      </div>
    </div>
  )
}

export default Coupons
