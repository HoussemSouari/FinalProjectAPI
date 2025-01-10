import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('access_token'); 
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/'); 
  };

  const goToProfile = () => {
    if (isAdmin) {
      navigate('/dashboard');
    } else {
      navigate('/profile');
    }
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
          {isLoggedIn && (
          <div 
            className="navbar-item profile-icon" 
            onClick={goToProfile} // Redirect to the profile page when clicked
          >
            <FaUserCircle size={30} />
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
