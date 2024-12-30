import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import Navbar from '../NavBar/NavBar';

const HomePage = () => {
  const [promises, setPromises] = useState([]);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('access_token'); 


  // Fetch all promises on component mount
  useEffect(() => {
    const fetchPromises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/promise');
        setPromises(response.data);
      } catch (err) {
        console.error('Error fetching promises:', err);
      }
    };

    fetchPromises();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div className="content">
        <h2>Government Promises</h2>

        {/* Display Promises in Cards */}
        <div className="promises-container">
          {promises.length === 0 ? (
            <p>No promises found.</p>
          ) : (
            promises.map((promise) => (
              <div className="promise-card" key={promise.id}>
                <h3>{promise.title}</h3>
                <p>{promise.description}</p>
                <Link to={`/promise/${promise.id}`} className="btn-details">
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Show 'Add New Promise' button only for admins */}
        {isAdmin && isLoggedIn &&(
          <Link to={`/promise/add`}>
            <button className="btn-add">Add New Promise</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
