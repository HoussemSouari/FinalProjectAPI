import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import Navbar from '../NavBar/NavBar';

const HomePage = () => {
  const [promises, setPromises] = useState([]);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Store only the ID
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');

  // Fetch categories and regions on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/region');
        setRegions(response.data);
      } catch (err) {
        console.error('Error fetching regions:', err);
      }
    };

    fetchCategories();
    fetchRegions();
  }, []);

  // Fetch promises based on selected category or region
  useEffect(() => {
    const fetchPromises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/promise', {
          params: {
            category: selectedCategory, // Send the selected category ID
            region: selectedRegion,     // Send the selected region ID
          },
        });
        setPromises(response.data);
      } catch (err) {
        console.error('Error fetching promises:', err);
      }
    };

    fetchPromises();
  }, [selectedCategory, selectedRegion]);


  return (
    <div>
      {/* Navbar */}
      <Navbar/>

      <div className="content">
        <h2>Government Promises</h2>

        {/* Filter Categories */}
        <div className="filters">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // Set the category ID here
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}> {/* Use category id here */}
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)} // Set the region ID here
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}> {/* Use region id here */}
                {region.name}
              </option>
            ))}
          </select>
        </div>

        {/* Display Promises in Cards */}
        <div className="promises-container">
          {promises.length === 0 ? (
            <p>No promises found for the selected filters.</p>
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
        {isAdmin && (
          <Link to={`/promise/add`}>
            <button className="btn-add">Add New Promise</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
