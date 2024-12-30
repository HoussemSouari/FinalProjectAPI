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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage/>} />
        <Route path="/region" element={<RegionPage/>}/>
        <Route path="/region/:regionId" element={<RegionDetails />} />
        <Route path="/promise/:id" element={<PromiseDetails />} />
        <Route path="/promise/add" element={<AddPromise/>}/>
      </Routes>
    </Router>
  );
}

export default App;
