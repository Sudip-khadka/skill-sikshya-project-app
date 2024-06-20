import React from 'react';
import { DatePicker, Space } from 'antd';
import './Table.css';

const { RangePicker } = DatePicker;

const DateRange = () => (
    <Space direction="vertical" className="custom-date-picker">
      <RangePicker />
    </Space>
);

export default DateRange;
