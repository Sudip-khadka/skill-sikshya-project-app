import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ControlledSwitches from './Switch';
import { TablePagination } from '@mui/material';

const url = 'https://retoolapi.dev/ONeFE7/data';
const url2 = 'https://retoolapi.dev/vor7Zw/data';

const EditAppointment = ({ searchQuery, rowsPerPage, setRowsPerPage, setIsDialogOpen, dateRange }) => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);

  const splitDateTime = (dateTime) => {
    if (!dateTime) return { date: 'N/A', time: 'N/A' };
    const [date, time] = dateTime.split(' ');
    const timeWithMeridiem = `${time} ${dateTime.split(' ')[3]}`;
    return { date: `${date} ${dateTime.split(' ')[1]} ${dateTime.split(' ')[2]}`, time: timeWithMeridiem };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([axios.get(url), axios.get(url2)]);
        const response2Map = new Map(response2.data.map(item => [item.id, item]));
        const combinedData = response1.data.map((item, index) => {
          let serviceFees = item.number * 200;
          const { date, time } = splitDateTime(item.date);
          const response2Item = response2Map.get(item.id) || {};
          return {
            id: item.id,
            sn: index + 1,
            serviceType: 'Custom Orders',
            timeSlots: `${date}` || 'N/A',
            name: `${item.name || 'N/A'}\n${item.phone || 'N/A'}\n${item.email || 'N/A'}`,
            number: item.number !== undefined ? item.number : 'N/A',
            fees: `Rs.${serviceFees !== undefined ? serviceFees : 'N/A'}`,
            active: response2Item.boolean !== undefined ? response2Item.boolean : true,
            date: item.date,
          };
        });
        setRows(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSwitchToggle = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, active: !row.active } : row
    );
    setRows(updatedRows);
  };

  const getRowClassName = (params) => {
    return params.row.active ? '' : 'disabled-row';
  };

  const handleCellClick = (params, event) => {
    if (params.field !== '__check__') {
      event.stopPropagation();
    }
  };

  const handleEdit = (id) => {
    const rowData = rows.find(row => row.id === id);
    setIsDialogOpen('Edit Appointment', 'Save Changes', rowData);
    console.log('Edit row with id:', id);
  };

  const columns = [
    { field: 'sn', headerName: 'S.N', flex: 1 },
    { field: 'serviceType', headerName: 'Service Type', flex: 1 },
    { field: 'timeSlots', headerName: 'Time Slots', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'number', headerName: 'Staffs', type: 'number', flex: 1 },
    {
      field: 'fees',
      headerName: 'Service Fees',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      flex: 1,
    },
    {
      field: 'editEntry',
      headerName: 'Edit Entry',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <button onClick={() => handleEdit(params.row.id)} style={{ padding: '5px 10px' }}>Edit</button>
      ),
    },
    {
      field: 'active',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <ControlledSwitches
          checked={params.row.active}
          onChange={() => handleSwitchToggle(params.row.id)}
        />
      ),
    },
  ];

  const filteredRows = rows.filter(row => {
    const rowDate = new Date(row.date).getTime();
    const [startDate, endDate] = dateRange;

    const isWithinRange = startDate && endDate
      ? rowDate >= startDate.startOf('day').valueOf() && rowDate <= endDate.endOf('day').valueOf()
      : true;

    return isWithinRange && Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = +event.target.value;
    setRowsPerPage(value); // Update rowsPerPage in parent component
    setPage(0); // Reset page to first page
  };

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <style>
        {`
          .disabled-row {
            opacity: 0.5;
            background-color: #f5f5f5;
          }
        `}
      </style>
      <DataGrid
        rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        columns={columns}
        checkboxSelection
        pageSize={rowsPerPage}
        disableSelectionOnClick
        onCellClick={handleCellClick}
        getRowClassName={getRowClassName}
        style={{ height: '89%' }}
      />
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default EditAppointment;
