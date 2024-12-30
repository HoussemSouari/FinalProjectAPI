import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('access_token'); 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-item">Home</Link>
        <Link to="/category" className="navbar-item">Categories</Link>
        <Link to="/region" className="navbar-item">Regions</Link>
      </div>
      <div className="navbar-right">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="navbar-item">Login</Link>
            <Link to="/signup" className="navbar-item">Signup</Link>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout} className="navbar-item">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
