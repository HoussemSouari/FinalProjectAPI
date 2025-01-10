import React, { useEffect, useState } from "react";
import axios from "axios";

const DeletePromise = () => {
  const [promises, setPromises] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPromises();
  }, []);

  const fetchPromises = async () => {
    try {
      const response = await axios.get("http://localhost:5000/promise");
      setPromises(response.data);
    } catch (err) {
      console.error("Error fetching promises:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/promise/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setMessage("Promise deleted successfully!");
      fetchPromises();
      Navigate('/');
    } catch (err) {
      console.error("Error deleting promise:", err);
      setMessage("Failed to delete promise. Please try again.");
    }
  };

  return (
    <div>
      <h1>Delete Promise</h1>
      {message && <p>{message}</p>}
      <ul>
        {promises.map((promise) => (
          <li key={promise.id}>
            <strong>{promise.title}</strong>: {promise.description}
            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  `Are you sure you want to delete the promise: "${promise.title}"?`
                );
                if (confirmDelete) {
                  handleDelete(promise.id);
                }
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePromise;
