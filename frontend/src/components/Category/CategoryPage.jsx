import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import './CategoryPage.css';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/category');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="categories-container">
        <h2>Categories</h2>
        <div className="categories-grid">
          {categories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            categories.map((category) => (
              <div className="category-card" key={category.id}>
                <h3>{category.name}</h3>
                <Link to={`/category/${category.id}`} className="btn-details">
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
