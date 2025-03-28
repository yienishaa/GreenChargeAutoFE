// src/pages/VehicleDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VehicleDetail = () => {
  const { id } = useParams(); // Get the vehicle id from the URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicle) {
    return <div>No vehicle found</div>;
  }

  return (
    <div>
      <h1>Vehicle Details</h1>
      <p><strong>Model:</strong> {vehicle.model}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Price:</strong> ${vehicle.price}</p>
      <p><strong>Description:</strong> {vehicle.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default VehicleDetail;
