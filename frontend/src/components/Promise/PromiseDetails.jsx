import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PromiseDetails.css';  // Importing the CSS file
import Navbar from '../NavBar/NavBar';

const PromiseDetails = () => {
  const { id } = useParams(); // Get the promise ID from the URL
  const [promise, setPromise] = useState(null);

  useEffect(() => {
    const fetchPromise = async () => {
      try {
        // Fetch promise details by ID
        const response = await axios.get(`http://localhost:5000/promise/${id}`);
        setPromise(response.data); // Set the promise data
      } catch (err) {
        console.error('Error fetching promise details:', err);
      }
    };
    fetchPromise();
  }, [id]);

  if (!promise) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="promise-details-container">
      <Navbar/>
      <div className="promise-details-card">
        <h2>{promise.title}</h2>
        <p><strong>Description:</strong> {promise.description}</p>
        <p className="status"><strong>Status:</strong> {promise.status}</p>
        <p className="category-region"><strong>Category:</strong> {promise.category_name}</p>
        <p className="category-region"><strong>Region:</strong> {promise.region_name}</p>
        <p className="category-region"><strong>Creation Date:</strong> {promise.created_at}</p>
        <p className="category-region"><strong>Deadline:</strong> {promise.expected_to_end}</p>
        <p className="category-region"><strong>Budget:</strong> {promise.budget}</p>


      </div>
    </div>
  );
};

export default PromiseDetails;
