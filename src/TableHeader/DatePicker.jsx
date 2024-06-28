import React from 'react';
import { DatePicker, Space } from 'antd';
import './Table.css';

const { RangePicker } = DatePicker;

const DateRange = ({ setDateRange }) => (
    <Space direction="vertical" className="custom-date-picker">
      <RangePicker onChange={(dates) => setDateRange(dates)} />
    </Space>
);

export default DateRange;
