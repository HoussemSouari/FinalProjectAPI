import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Prepare data to send to the API
      const userData = {
        name,
        email,
        password,
        age: parseInt(age), // Convert age to number
      };

      // Send POST request to the Flask API
      const response = await axios.post('http://127.0.0.1:5000/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Signup failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="signup-input"
        />
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;
 