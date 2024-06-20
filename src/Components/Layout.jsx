import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <SideBar />
      <main className='display-board'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
