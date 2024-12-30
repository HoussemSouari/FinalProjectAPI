import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddPromise.css';  // Importing the CSS file

const AddPromise = () => {
  const [promiseData, setPromiseData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    user_id: '1', // Default user_id
    category_id: '',
    region_id: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Retrieve the access token from local storage
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('Unauthorized: Please log in to add a promise.');
        return;
      }

      // Send a POST request to add the promise
      const response = await axios.post(
        'http://127.0.0.1:5000/promise',
        promiseData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        }
      );

      console.log('Response:', response.data);
      // Redirect to the home page or promises list on success
      navigate('/');
    } catch (error) {
      console.error('Error adding promise:', error);

      // Check for specific error messages
      if (error.response) {
        if (error.response.status === 401) {
          setError('Unauthorized: You do not have permission to perform this action.');
        } else if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Failed to add promise. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleChange = (event) => {
    setPromiseData({
      ...promiseData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="add-promise-container">
      <form className="add-promise-form" onSubmit={handleSubmit}>
        <h2>Add a New Promise</h2>

        {/* Title */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={promiseData.title}
            onChange={handleChange}
            required
            placeholder="Enter promise title"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={promiseData.description}
            onChange={handleChange}
            placeholder="Enter a brief description"
          />
        </div>

        {/* Status */}
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={promiseData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* User ID */}
        <div>
          <label>User ID:</label>
          <input
            type="number"
            name="user_id"
            value={promiseData.user_id}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category ID */}
        <div>
          <label>Category Name:</label>
          <input
            type="number"
            name="category_id"
            value={promiseData.category_id}
            onChange={handleChange}
            required
            placeholder="Enter category id"
          />
        </div>

        {/* Region ID */}
        <div>
          <label>Region Name:</label>
          <input
            type="number"
            name="region_id"
            value={promiseData.region_id}
            onChange={handleChange}
            required
            placeholder="Enter region Name"
          />
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Submit Button */}
        <button type="submit">Add Promise</button>
      </form>
    </div>
  );
};

export default AddPromise;
