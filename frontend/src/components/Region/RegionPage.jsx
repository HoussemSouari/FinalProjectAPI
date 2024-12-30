import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import RegionDetails from './RegionDetails';
import './RegionPage.css';

const RegionPage = () => {
  const [regions, setRegions] = useState([]);
  const { regionId } = useParams(); // Extract regionId from URL

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/region');
        setRegions(response.data);
      } catch (err) {
        console.error('Error fetching regions:', err);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="categories-container">
        <h2>Regions</h2>
        <div className="categories-grid">
          {regions.length === 0 ? (
            <p>No regions found.</p>
          ) : (
            regions.map((region) => (
              <div className="category-card" key={region.id}>
                <h3>{region.name}</h3>
                <Link to={`/region/${region.id}`} className="btn-details">
  View Details
</Link>

              </div>
            ))
          )}
        </div>

        {/* If regionId is present in the URL, show the RegionDetails */}
        {regionId && <RegionDetails regionId={regionId} />}
      </div>
    </div>
  );
};

export default RegionPage;
