import React from 'react'
import '../TableHeader/Table.css'
import OrderHeaders from '../TableHeader/OrderHeaders'
import OrderTableBody from '../TableBody/OrderTableBody'

function Orders() {
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Orders</h1>
          <p>View Customers Orders</p>
        </div>
        
      
      </div>
      <div className="table">

      <OrderHeaders/>
      <div className="table-body">
        <OrderTableBody/>
      </div>
      </div>
    </div>
  )
}

export default Orders
