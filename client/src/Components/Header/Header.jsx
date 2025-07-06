import React from 'react'
import "./Header.css"

const Header = ({ title, image }) => {
  return (
    <div className="page-header">
      <h2 className="page-title">{title}</h2>
      <img src={image} alt="Header Visual" className="header-image" />
    </div>
  );
};

export default Header
