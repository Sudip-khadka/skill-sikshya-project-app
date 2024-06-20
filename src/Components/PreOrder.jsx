import React from 'react'
import OrderHeaders from '../TableHeader/OrderHeaders'

function PreOrder() {
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Pre Orders</h1>
          <p>View Customers Pre Orders Details</p>
        </div>
        
      
      </div>
      <div className="table">

      <OrderHeaders/>

      </div>
    </div>
  )
}

export default PreOrder
