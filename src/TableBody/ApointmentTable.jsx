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
import AppointmentStatus from '../TableHeader/AppointmentStatus';

const url = 'https://retoolapi.dev/ONeFE7/data';

const columns = [
  { id: 'id', label: 'Id', minWidth: 70 },
  { id: 'name', label: 'Name / Phone / Email', minWidth: 100 },
  {
    id: 'date',
    label: 'Date',
    minWidth: 70,
    align: 'left',
    format: (value) => new Date(value).toLocaleString('en-US'),
  },
  {
    id: 'timeSlots',
    label: 'Time Slots',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'serviceType',
    label: 'Service Type',
    minWidth: 70,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fees',
    label: 'Fees',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'paymentStatus',
    label: 'Payment',
    minWidth: 70,
    align: 'left',
    format: (value) => value,
  },
  {
    id: 'appointmentStatus',
    label: 'Appointment Status',
    minWidth: 70,
    align: 'left',
    format: (value) => value,
  },
];

function AppointentBody({ searchQuery, rowsPerPage,setRowsPerPage,dateRange }) {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios.get(url).then((response) => {
      const fetchedData = response.data.map((item) => {
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
          timeSlots: timePart,
          name: `${item.name}\n${item.phone}\n${item.email}`,
          number: item.number,
          fees: item.number * 200,
          serviceType: 'Hair Transplant',
          paymentStatus: (<PaymentStatus />),
          appointmentStatus: (<AppointmentStatus />),
        };
      });
      setRows(fetchedData);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = +event.target.value;
    setRowsPerPage(value); // Update rowsPerPage in parent component
    setPage(0); // Reset page to first page
  };

  // Filter rows based on search query
  const filteredRows = rows.filter((row) =>
   {
    const rowDate = new Date(row.date).getTime();
    const [startDate, endDate] = dateRange;

    const isWithinRange = startDate && endDate
      ? rowDate >= startDate.startOf('day').valueOf() && rowDate <= endDate.endOf('day').valueOf()
      : true;

    return isWithinRange && (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.timeSlots.toLowerCase().includes(searchQuery.toLowerCase())
    );}
  );

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
        rowsPerPageOptions={[10, 25, 50]}
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

export default AppointentBody;
