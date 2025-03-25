import React, { useEffect, useState } from "react";
import axios from "axios";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/vehicles");
        setVehicles(response.data); // Assuming the response data is an array of vehicles
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>{vehicle.name}</li> // Adjust this based on your vehicle object structure
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;