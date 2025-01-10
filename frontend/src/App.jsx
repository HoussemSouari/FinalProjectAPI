import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import HomePage from './components/Home/HomePage';
import PromiseDetails from './components/Promise/PromiseDetails';
import './App.css'
import AddPromise from './components/Promise/AddPromise';
import CategoryPage from './components/Category/CategoryPage';
import RegionPage from './components/Region/RegionPage';
import RegionDetails from './components/Region/RegionDetails';
import UpdateCredentials from './components/User/UpdateCredentials';
import Profile from './components/User/Profile';
import CategoryDetailsPage from './components/Category/CategoryDetails';
import Dashboard from './components/Admin/Dashboard';
import DeletePromise from './components/Promise/DeletePromise';
import UpdatePromise from './components/Promise/UpdatePromise';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage/>} />
        <Route path="/category/:categoryId" element={<CategoryDetailsPage />} />
        <Route path="/region" element={<RegionPage/>}/>
        <Route path="/update-credentials" element={<UpdateCredentials/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/region/:regionId" element={<RegionDetails />} />
        <Route path="/promise/:id" element={<PromiseDetails />} />
        <Route path="/promise/add" element={<AddPromise/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/promise/delete' element={<DeletePromise/>}/>
        <Route path='/promise/update' element={<UpdatePromise/>}/>
      </Routes>
    </Router>
  );
}

export default App;
