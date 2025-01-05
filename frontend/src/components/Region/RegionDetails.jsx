import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RegionDetails.css';  // Importing the CSS file
import Navbar from '../NavBar/NavBar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RegionDetails = () => {
  const { regionId } = useParams(); // Get the region ID from the URL
  const [region, setRegion] = useState(null);
  const [promises, setPromises] = useState([]);

  // Fetch region details
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/region/${regionId}`);
        setRegion(response.data);
      } catch (err) {
        console.error('Error fetching region details:', err);
      }
    };
    fetchRegion();
  }, [regionId]);

  // Fetch promises related to the region
  useEffect(() => {
    const fetchPromises = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/promise/region/${regionId}`);
        setPromises(response.data);
      } catch (err) {
        console.error('Error fetching promises for the region:', err);
      }
    };
    fetchPromises();
  }, [regionId]);

  if (!region) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="region-details-container">
      <Navbar />
      <div className="region-details-card">
        <h2>{region.name}</h2>
        <p><strong>Latitude:</strong> {region.latitude}</p>
        <p><strong>Longitude:</strong> {region.longitude}</p>

        {/* Map showing the region's location */}
        <div className="region-map">
          <MapContainer
            center={[region.latitude, region.longitude]}
            zoom={10}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[region.latitude, region.longitude]}>
              <Popup>{region.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Display promises related to the region */}
      <div className="region-promises">
        <h3>Promises in {region.name}</h3>
        {promises.length === 0 ? (
          <p>No promises found for this region.</p>
        ) : (
          <div className="promises-list">
            {promises.map((promise) => (
              <div className="promise-card" key={promise.id}>
                <h4>{promise.title}</h4>
                <Link to={`/promise/${promise.id}`} className="btn-details">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionDetails;
