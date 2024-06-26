import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import ControlledSwitches from '../Components/Appointments/Switch';

const CouponTable = ({
  searchQuery = '',
  rowsPerPage = 10,
  setRowsPerPage,
  setIsDialogOpen,
  setDialogTitle,
  openDialog,
  dateRange = [],
  coupon,
  setCoupon,
  couponStatus,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    const fetchCouponData = async () => {
      try {
        const response = await axios.get('https://retoolapi.dev/QRshdd/data');
        console.log('Fetched Data:', response.data); // Debug log for fetched data
        const fetchedData = response.data.map((item, index) => {
          const couponType = item.Boolean ? 'Percentage' : 'Flat';
          const discount = couponType === 'Flat' ? `Rs ${1500}` : `${15}%`;
          const status = item.Boolean ? 'Active' : 'Expired';
          // Parse starting date including time
          const startsDate = new Date(item.startingdate);

          // Calculate end date 30 days from starting date
          const endsDate = new Date(startsDate);
          endsDate.setDate(startsDate.getDate() + 30);

          // Format dates for display
          const formattedStartDate = startsDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          const formattedEndDate = endsDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

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
            status: status,
          };
        });
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCouponData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let result = data;

      // Filter by search query
      if (searchQuery.trim() !== '') {
        result = result.filter((item) =>
          item.couponCode.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('Data after search query filtering:', result); // Debug log after search query filtering
      }

      // Filter by coupon type
      if (coupon) {
        if (coupon === 'flatType') {
          result = result.filter(
            (item) => item.couponType.toLowerCase() === 'flat'
          );
        } else if (coupon === 'percentage') {
          result = result.filter(
            (item) => item.couponType.toLowerCase() === 'percentage'
          );
        }
        console.log('Data after coupon type filtering:', result); // Debug log after coupon type filtering
      }
      if (couponStatus) {
        console.log('Data after coupon status filtering:', result);
        if (couponStatus === 'active') {
          result = result.filter(
            (item) => item.status.toLowerCase() === 'active'
          );
        } else if (couponStatus === 'expired') {
          result = result.filter(
            (item) => item.status.toLowerCase() === 'expired'
          );
        }
      }

      // Apply date range filter only if a valid date range is provided
      if (dateRange[0] !== null) {
        const [rangeStartDate, rangeEndDate] = dateRange.map(
          (date) => new Date(date)
        );
        result = result.filter((item) => {
          const itemEndsDate = new Date(item.endsDate);
          return (
            itemEndsDate >= rangeStartDate && itemEndsDate <= rangeEndDate
          );
        });
        console.log(dateRange, dateRange.length);
        console.log(
          'Data after date range filtering:',
          result
        ); // Debug log after date range filtering
      }

      setFilteredData(result);
      console.log('Final Filtered Data:', result); // Debug log for final filtered data
    };

    filterData();
  }, [searchQuery, dateRange, coupon, couponStatus, data]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleSwitchToggle = (id) => {
    // Implement your toggle switch logic here
    console.log(`Toggling switch for ID ${id}`);
  };

  const handleEdit = (id) => {
    // Find the row data based on ID
    const editedRow = filteredData.find((row) => row.id === id);

    // Open dialog for editing with appropriate title and button text
    openDialog('Edit Coupon', 'Save Changes', editedRow);
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
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

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
        <button
          onClick={() => handleEdit(record.id)}
          style={{
            padding: '5px 15px',
            color: '#86888A',
            background: 'none',
            border: '1px solid #86888A',
            borderRadius: '5px',
          }}
        >
          Edit
        </button>
      ),
      align: 'center',
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

export default CouponTable;
