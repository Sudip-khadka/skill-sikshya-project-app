import React from 'react'
import CouponHeader from '../TableHeader/CouponHeader'
import CouponTable from '../TableBody/CouponTable'

function Coupons() {
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
      <CouponHeader/>
      <div className="table-body">
      <CouponTable />
      </div>

      </div>
    </div>
  )
}

export default Coupons
