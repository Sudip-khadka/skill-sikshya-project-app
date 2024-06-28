// SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([null, null]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, rowsPerPage, setRowsPerPage, dateRange, setDateRange }}>
      {children}
    </SearchContext.Provider>
  );
};
