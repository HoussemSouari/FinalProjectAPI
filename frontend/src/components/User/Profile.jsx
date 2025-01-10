import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import Navbar from '../NavBar/NavBar';

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
        try{
            const token = localStorage.getItem('access_token');

            const response = await axios.get('http://localhost:5000/protected',{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setUserInfo(response.data);
            setLoading(false);
        } catch(err) {
            setError('Error fetching user information');
            setLoading(false);
        }
    };
    fetchUserInfo();
},[]);

  return (
    <div>
      <Navbar />
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Age:</strong> {userInfo.age}</p>
      </div>

      <div className="update-option">
        <Link to="/update-credentials">
          <button className="btn-update">Update Your Information</button>
        </Link>
      </div>
    </div>
    </div>
  );
};

export default Profile;
