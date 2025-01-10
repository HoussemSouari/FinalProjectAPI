import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdatePromise.css';

const UpdatePromise = ({ onUpdate = () => {} }) => {
    const [promiseId, setPromiseId] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');
    const [promiseData, setPromiseData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const fetchPromiseData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/promise/${promiseId}`);
            setPromiseData(response.data);
            setStatus(response.data.status);
            setError('');
        } catch (err) {
            console.error('Error fetching promise data:', err);
            setError('Failed to fetch promise details. Please try again.');
            setPromiseData(null);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/promise/${promiseId}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            onUpdate();
            navigate('/dashboard');
        } catch (err) {
            console.error('Error updating promise:', err);
            setError('Failed to update the promise. Please try again.');
        }
    };



    const handleConfirmUpdate = () => {
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        handleUpdate();
    };

    const handleCancelConfirmation = () => {
        setShowConfirmation(false);
        navigate('/dashboard');
    };

    const onCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="update-promise-container">
            <h2 className="update-promise-header">Update Promise Status</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="update-promise-form">
                <label>Promise ID:</label>
                <input
                    type="text"
                    value={promiseId}
                    onChange={(e) => setPromiseId(e.target.value)}
                    placeholder="Enter Promise ID"
                />
                <button onClick={fetchPromiseData} className="update-promise-form button">Fetch Promise</button>

                {promiseData && (
                    <>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button onClick={handleConfirmUpdate} className="update-promise-form button update">Update</button>
                        <button onClick={onCancel} className="update-promise-form button cancel">Cancel</button>
                    </>
                )}
            </div>

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to update the promise?</p>
                    <button onClick={handleConfirm} className="confirmation-popup button confirm">Confirm</button>
                    <button onClick={handleCancelConfirmation} className="confirmation-popup button cancel">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UpdatePromise;