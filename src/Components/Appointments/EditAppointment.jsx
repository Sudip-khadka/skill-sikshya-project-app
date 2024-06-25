import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ControlledSwitches from './Switch'; // Make sure to import the correct path for ControlledSwitches

const url = 'https://retoolapi.dev/ONeFE7/data';
const url2 = 'https://retoolapi.dev/vor7Zw/data';

const EditAppointment = () => {
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
        console.log('Response 1 data:', response1.data);
        console.log('Response 2 data:', response2.data);

        // Create a map from response2 data using the id as the key
        const response2Map = new Map(response2.data.map(item => [item.id, item]));

        // Merge the data from response1 and response2
        const combinedData = response1.data.map((item, index) => {
          let serviceFees = item.number * 200;
          const { date, time } = splitDateTime(item.date);
          const response2Item = response2Map.get(item.id) || {};
          return {
            id: item.id,
            sn: index + 1, // Use index + 1 for a sequential S.N
            serviceType: 'Hair Transplant',
            timeSlots: `${date}n${time}` || 'N/A', // Provide a default value
            name: `${item.name || 'N/A'}\n${item.phone || 'N/A'}\n${item.email || 'N/A'}`,
            number: item.number !== undefined ? item.number : 'N/A', // Provide a default value
            fees: `Rs.${serviceFees !== undefined ? serviceFees : 'N/A'}`, // Provide a default value
            active: response2Item.boolean !== undefined ? response2Item.boolean : true, // Default to active
          };
        });

        console.log('Combined data:', combinedData);
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
          onChange={() => handleSwitchToggle(params.row.id)}
        />
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <style>
        {`
          .disabled-row {
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
