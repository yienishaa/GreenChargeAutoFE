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
        setVehicles(response.data); 
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, []); 

  if (loading) {
    return <div className="pt-20">Loading...</div>;
  }

  if (error) {
    return <div className="pt-20">Error: {error}</div>;
  }

  return (
    <div className="pt-20">
      <h1 >Vehicles</h1>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>{vehicle.name}</li> // Adjust this based on your vehicle object structure
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;