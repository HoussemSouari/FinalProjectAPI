import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdateCredentials.css';

const UpdateCredentials = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('access_token');

    if (!token) {
        setError('You must be logged in to update your credentials');
        return;
    }

    try {
      const response = await axios.put('http://localhost:5000/update', {
        username,
        email,
        password
      },{
        headers: {
            Authorization : `Bearer ${token}`
        }
      });

      // Assuming the API returns success on successful update
      if (response.status === 200) {
        alert('Credentials updated successfully!');
        navigate('/profile'); // Redirect to the profile page or another page after update
      }
    } catch (err) {
      console.error('Error updating credentials:', err);
      setError('Failed to update credentials. Please try again.');
    }
  };

  return (
    <div className="update-credentials">
      <h2>Update Your Credentials</h2>
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-update">Update</button>
      </form>
    </div>
  );
};

export default UpdateCredentials;
