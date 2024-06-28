import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import ControlledSwitches from '../Components/Appointments/Switch';

const columns = [
  {
    title: 'S.N',
    dataIndex: 'id',
  },
  {
    title: 'Coupon Code',
    dataIndex: 'couponCode',
  },
  {
    title: 'Starts Date',
    dataIndex: 'startsDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endsDate',
  },
  {
    title: 'Coupon Type',
    dataIndex: 'couponType',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Limit',
    dataIndex: 'limit',
  },
  {
    title: 'Edit Entry',
    dataIndex: 'editEntry',
    render: (text, record) => (
      <button onClick={() => handleEdit(record.id)} style={{ padding: '5px 15px', color: "#86888A", background: "none", border: "1px solid #86888A", borderRadius: "5px" }}>
        Edit
      </button>
    ),
    align: 'center'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (text) => {
      let backgroundColor, color, borderRadius, padding;

      if (text === 'Active') {
        backgroundColor = '#C3FEE8';
        color = 'green';
      } else if (text === 'Expired') {
        backgroundColor = '#FFE6E8';
        color = 'red';
      }

      borderRadius = '15px';
      padding = '5px 0px';

      return (
        <div style={{ backgroundColor, color, borderRadius, padding }}>
          {text}
        </div>
      );
    },
  },
  {
    title: 'Action',
    render: (text, record) => (
      <ControlledSwitches
        checked={record.active}
        onChange={() => handleSwitchToggle(record.id)}
      />
    ),
  },
];

const App = ({ searchQuery = '', rowsPerPage = 10, setRowsPerPage, setIsDialogOpen, dateRange = [], coupon, setCoupon }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    const fetchCouponData = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/QRshdd/data');
        console.log('Fetched Data:', response.data); // Debug log for fetched data
        const fetchedData = response.data.map((item, index) => {
          const couponType = item.Boolean ? "Percentage" : "Flat";
          const discount = couponType === "Flat" ? `Rs ${1500}` : `${15}%`;

          // Parse starting date including time
          const startsDate = new Date(item.startingdate);

          // Calculate end date 30 days from starting date
          const endsDate = new Date(startsDate);
          endsDate.setDate(startsDate.getDate() + 30);

          // Format dates for display
          const formattedStartDate = startsDate.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          const formattedEndDate = endsDate.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

          return {
            key: index,
            id: index + 1,
            couponCode: `CNX${item.couponcode}` || `Coupon Code ${index}`,
            startsDate: formattedStartDate,
            endsDate: formattedEndDate,
            couponType: couponType,
            discount: discount,
            limit: 25,
            active: true, // Assuming item.active is a boolean value indicating status
            status: item.Boolean ? "Active" : "Expired",
          };
        });
        setData(fetchedData);
        setFilteredData(fetchedData); // Initialize filteredData with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCouponData();
  }, []);

 // Update filtered data when search query, date range, or coupon changes
 useEffect(() => {
  const filterData = () => {
    let result = data;

    if (searchQuery.trim() !== '' || coupon !== '') {
      result = result.filter((item) =>
        item.couponCode.toLowerCase().includes(searchQuery.toLowerCase()));
      console.log('Data after search query and coupon filtering:', result); // Debug log after search query and coupon filtering
    }

    // Filter based on coupon type selection
    if(searchQuery.trim() !== '' || coupon !== '' ){
      if (coupon === 'flatType') {
        result = result.filter((item) => item.couponType.toLowerCase() === 'flat');
      } else if (coupon === 'percentage') {
        result = result.filter((item) => item.couponType.toLowerCase() === 'percentage');
      }
    }

    // Apply date range filter only if a valid date range is provided
    if (dateRange && dateRange.length === 2) {
      const [rangeStartDate, rangeEndDate] = dateRange.map(date => new Date(date));
      result = result.filter((item) => {
        const itemEndsDate = new Date(item.endsDate);
        return itemEndsDate >= rangeStartDate && itemEndsDate <= rangeEndDate;
      });
      console.log('Data after date range filtering:', result); // Debug log after date range filtering
    }

    setFilteredData(result);
    console.log('Final Filtered Data:', result); // Debug log for final filtered data
  };

  filterData();
}, [searchQuery, dateRange, coupon]); // Add coupon to dependency array


  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSwitchToggle = (id) => {
    // Implement your toggle switch logic here
    console.log(`Toggling switch for ID ${id}`);
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Editing entry with ID ${id}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: rowsPerPage }}
        scroll={{ y: 350 }}
        style={{ height: '70vh' }}
      />
    </div>
  );
};

export default App;
