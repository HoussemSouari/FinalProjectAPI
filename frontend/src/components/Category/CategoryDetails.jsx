import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CategoryDetails.css';
import Navbar from '../NavBar/NavBar';

const CategoryDetails = () => {
  const { categoryId } = useParams(); // Get categoryId from the URL parameters
  const [category, setCategory] = useState(null);
  const [promises, setPromises] = useState([]);

  // Fetch category details and promises based on categoryId
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryResponse = await axios.get(`http://localhost:5000/category/${categoryId}`);
        setCategory(categoryResponse.data);
      } catch (err) {
        console.error('Error fetching category details:', err);
      }
    };

    const fetchPromises = async () => {
      try {
        const promisesResponse = await axios.get(`http://localhost:5000/promise/category/${categoryId}`);
        setPromises(promisesResponse.data);
      } catch (err) {
        console.error('Error fetching promises:', err);
      }
    };

    fetchCategoryDetails();
    fetchPromises();
  }, [categoryId]); // Re-run when categoryId changes

  return (
    <div className="category-details">
        <Navbar/>
      <h2>Category Details</h2>

      {/* Display Category Name */}
      {category && <h3>{category.name}</h3>}

      {/* Display Promises related to the Category */}
      <h4>Promises in this Category:</h4>
      <div className="promises-container">
        {promises.length === 0 ? (
          <p>No promises found for this category.</p>
        ) : (
          promises.map((promise) => (
            <div className="promise-card" key={promise.id}>
              <h5>{promise.title}</h5>
              <p>{promise.description}</p>
              <Link to={`/promise/${promise.id}`} className="btn-details">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
