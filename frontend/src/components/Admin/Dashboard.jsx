import React from "react";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';
import Navbar from "../NavBar/NavBar";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
        <Navbar/>
    <div className="dashboard-container">
      
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <div className="dashboard-section">
        <h2>Promises</h2>
        <div className="dashboard-buttons">
          <button className="dashboard-button add" onClick={() => navigate("/promise/add")}>Add Promise</button>
          <button className="dashboard-button view" onClick={() => navigate("/")}>View Promises</button>
          <button className="dashboard-button edit" onClick={() => navigate("/promise/update")}>Edit Promise</button>
          <button className="dashboard-button delete" onClick={() => navigate("/promise/delete")}>Delete Promise</button>
        </div>
        <h2>Categories</h2>
        <div className="dashboard-buttons">
          <button className="dashboard-button add" onClick={() => navigate("/category/add")}>Add Category</button>
          <button className="dashboard-button view" onClick={() => navigate("/category")}>View Categories</button>
          <button className="dashboard-button edit" onClick={() => navigate("/category/update")}>Edit Category</button>
          <button className="dashboard-button delete" onClick={() => navigate("/category/delete")}>Delete Category</button>
        </div>
        <h2>Regions</h2>
        <div className="dashboard-buttons">
          <button className="dashboard-button add" onClick={() => navigate("/region/add")}>Add Region</button>
          <button className="dashboard-button view" onClick={() => navigate("/region")}>View Regions</button>
          <button className="dashboard-button edit" onClick={() => navigate("/region/update")}>Edit Region</button>
          <button className="dashboard-button delete" onClick={() => navigate("/region/delete")}>Delete Region</button>
        </div>
        <h2>Users</h2>
        <div className="dashboard-buttons">
          <button className="dashboard-button add" onClick={() => navigate("/user/add")}>Add User</button>
          <button className="dashboard-button view" onClick={() => navigate("/users")}>View Users</button>
          <button className="dashboard-button edit" onClick={() => navigate("/user/update")}>Edit User</button>
          <button className="dashboard-button delete" onClick={() => navigate("/user/delete")}>Delete User</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;