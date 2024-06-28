import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { FaSortAmountDown } from 'react-icons/fa';
import { LuEye } from "react-icons/lu";
import PaymentStatus from '../TableHeader/PaymentStatus';
import DeliveryStatus from '../TableHeader/DeliveryStatus';

const url = 'https://retoolapi.dev/ONeFE7/data';

const columns = [
  { id: 'id', label: 'Id', minWidth: 70 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 70,
    align: 'left',
    format: (value) => new Date(value).toLocaleString('en-US'),
  },
  { id: 'name', label: 'Name / Phone / Email\nDelivery Address', minWidth: 100 },
  {
    id: 'number',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Qty <FaSortAmountDown style={{ marginLeft: 4 }} />
      </div>
    ),
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'total',
    label: (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        Total <FaSortAmountDown style={{ marginLeft: 4 }} />
      </div>
    ),
    minWidth: 70,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'discountApplied',
    label: 'Discount Applied',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'paymentStatus',
    label: 'Payment Status',
    minWidth: 70,
    align: 'left',
    format: (value) => value,
  },
  {
    id: 'deliveryStatus',
    label: 'Delivery Status',
    minWidth: 70,
    align: 'left',
    format: (value) => value,
  },
  {
    id: 'orderDetails',
    label: 'Order Details',
    minWidth: 70,
    align: 'left',
    format: (value) => value,
  },
];

function OrderTable({ searchQuery, rowsPerPage, setRowsPerPage, dateRange }) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  function getRandomMultipleOf50(min, max) {
    const minMultiple = Math.ceil(min / 50);
    const maxMultiple = Math.floor(max / 50);
    const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple;
    return randomMultiple * 50;
  }

  React.useEffect(() => {
    axios.get(url).then((response) => {
      const fetchedData = response.data.map((item) => {
        const discountApplied = getRandomMultipleOf50(100, 1000);
        const total = (item.number * 200) - discountApplied;
        let dateString = item.date;
        const separateDateTime = (dateString) => {
          const dateObj = new Date(dateString);
          const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
          const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

          const datePart = dateObj.toLocaleDateString(undefined, optionsDate);
          const timePart = dateObj.toLocaleTimeString(undefined, optionsTime);

          return { datePart, timePart };
        };
        const { datePart, timePart } = separateDateTime(dateString);
        return {
          id: item.id,
          date: datePart,
          name: `${item.name}\n${item.phone}\n${item.email}\n${item.address}`,
          number: item.number,
          discountApplied: discountApplied,
          total: total,
          paymentStatus: (<PaymentStatus />),
          deliveryStatus: (<DeliveryStatus />),
          orderDetails: (<div className='more-order-details' onClick={() => showOrder(item)}><LuEye /></div>),
        };
      });
      setRows(fetchedData);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showOrder = (item) => {
    // Function to show order details (implementation required)
    console.log("Order details for:", item);
  };

  // Filter rows based on search query and date range
  const filteredRows = rows.filter((row) => {
    const rowDate = new Date(row.date).getTime();
    const [startDate, endDate] = dateRange;

    const isWithinRange = startDate && endDate
      ? rowDate >= startDate.startOf('day').valueOf() && rowDate <= endDate.endOf('day').valueOf()
      : true;

    return isWithinRange && (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.date.toLowerCase().includes(searchQuery.toLowerCase()) // Adjust this line as needed for other searchable fields
    );
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={column.id === 'name' ? { whiteSpace: 'pre-line' } : {}}
                      >
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderTable;
