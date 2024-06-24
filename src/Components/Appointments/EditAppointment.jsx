import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ControlledSwitches from './Switch'; // Make sure to import the correct path for ControlledSwitches

const url = 'https://retoolapi.dev/ONeFE7/data';

const EditAppointment = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      const fetchedData = response.data.map((item) => ({
        id: item.id,
        sn: item.id,
        serviceType: 'Hair Transplant',
        timeSlots: item.timeslots,
        name: `${item.name}\n${item.phone}\n${item.email}`,
        number: item.staffs,
        fees: `Rs.${item.serviceFees}`,
        active: true, // Default to active
      }));
      setRows(fetchedData);
    });
  }, []);

  const handleSwitchToggle = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, active: !row.active } : row
    );
    setRows(updatedRows);
  };

  const getRowClassName = (params) => {
    console.log(params)
    return params.row.active ? '' : 'disabled-row';
  };

  const handleCellClick = (params, event) => {
    if (params.field !== '__check__') {
      event.stopPropagation();
    }
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
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
        <button onClick={() => handleEdit(params.row.id)}>Edit</button>
      ),
    },
    {
      field: 'active',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <ControlledSwitches
          checked={params.row.active} // Pass row-specific active state
            onChange={()=>getRowClassName(params)}
        />
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <style>
        {`
          .disabled-row {
            pointer-events: none;
            opacity: 0.5;
            background-color: #f5f5f5; /* Optional: Make it more noticeable */
          }
        `}
      </style>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableSelectionOnClick
        onCellClick={handleCellClick}
        getRowClassName={getRowClassName}
        style={{ height: '100%' }}
      />
    </div>
  );
};

export default EditAppointment;
