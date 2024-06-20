import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../Styles/Sidebar.css";
import GmailTreeView from "./SideBar2";
import LogoutIcon from '@mui/icons-material/Logout';

function SideBar() {
  return (
    <div className="sidebar">
      <Link to='/'>
      <div className="logo">
        <img src={Logo} alt="" srcSet="" />
      </div>
      </Link>
      <div className="menus">
        <GmailTreeView />
        <div className="logout">

          <h3>Logout</h3>
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
