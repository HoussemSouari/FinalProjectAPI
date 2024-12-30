import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });

      const { access_token, isAdmin } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('isAdmin', isAdmin);
      console.log(isAdmin);

      navigate('/');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid email or password.');
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
