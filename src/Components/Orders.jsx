import React, { useContext } from 'react'
import '../TableHeader/Table.css'
import OrderHeaders from '../TableHeader/OrderHeaders'
import { SearchContext } from './Context/StateManagement';
import OrderTable from '../TableBody/OrderTable';

function Orders() {
  const { searchQuery, setSearchQuery, rowsPerPage, setRowsPerPage, dateRange, setDateRange } = useContext(SearchContext);
  return (
    <div>
      <div className="product-categories-header">
        <div className="product-categories-header-text">
          <h1>Orders</h1>
          <p>View Customers Orders</p>
        </div>
        
      
      </div>
      <div className="table">

      <OrderHeaders setSearchQuery={setSearchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange} setDateRange={setDateRange}/>
        <OrderTable searchQuery={searchQuery} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} dateRange={dateRange}/>
      </div>
    </div>
  )
}

export default Orders
