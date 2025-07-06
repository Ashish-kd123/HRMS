import React from 'react';

import './Logout.css'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Logout = ({ onClose }) => {
  const navigate = useNavigate();
const { logout } = useAuth();


 const handleLogout = () => {
    logout();              
    navigate('/login');    
  };

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-box">
        <div className="logout-modal-header">
          <h2 style={{ color: "white" }}>Log Out</h2>
        </div>
        <div className="logout-modal-body">
          <p>Are you sure you want to log out?</p>
          <div className="logout-modal-buttons">
            <button className="logout-cancel-btn" onClick={onClose}>Cancel</button>
            <button className="logout-confirm-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
