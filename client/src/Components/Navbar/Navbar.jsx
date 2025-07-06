import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/images/Logo.png';
import candidatesIcon from '../../assets/icons/user-add@2x.png';
import employeesIcon from '../../assets/icons/users.png';
import attendanceIcon from '../../assets/icons/attandance.png';
import leavesIcon from '../../assets/icons/leave.png';
import logoutIcon from '../../assets/icons/log-out@2x.png';
import Logout from '../../Components/Logout/Logout.jsx';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openLogoutModal = () => {
    setShowModal(true);
    setIsSidebarOpen(false); 
  };
  const closeLogoutModal = () => setShowModal(false);

  
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  

  return (
    <>
     
      <div className="hamburger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-box">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>

        <div className="section">
          <p className="section-title">Recruitment</p>
          <Link to="/candidates" className={`nav-item ${isActive('/candidates') ? 'active' : ''}`}>
            <img src={candidatesIcon} alt="Candidates" className="icon" />
            <span>Candidates</span>
          </Link>
        </div>

        <div className="section">
          <p className="section-title">Organization</p>
          <Link to="/employees" className={`nav-item ${isActive('/employees') ? 'active' : ''}`}>
            <img src={employeesIcon} alt="Employees" className="icon" />
            <span>Employees</span>
          </Link>
          <Link to="/attendance" className={`nav-item ${isActive('/attendance') ? 'active' : ''}`}>
            <img src={attendanceIcon} alt="Attendance" className="icon" />
            <span>Attendance</span>
          </Link>
          <Link to="/leaves" className={`nav-item ${isActive('/leaves') ? 'active' : ''}`}>
            <img src={leavesIcon} alt="Leaves" className="icon" />
            <span>Leaves</span>
          </Link>
        </div>

        <div className="section">
          <p className="section-title">Others</p>
          <div className="nav-item logout" onClick={openLogoutModal}>
            <img src={logoutIcon} alt="Logout" className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </nav>

      {showModal && <Logout onClose={closeLogoutModal} />}
    </>
  );
};

export default Navbar;
