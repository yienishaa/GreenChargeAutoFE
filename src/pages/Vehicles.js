import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import { Link } from "react-router-dom";

const vehicles = [{vid: 1, brand: "Toyota", description: "Good car", hasBeenInAccident: true, manufacturedYear: Date.now(), mileage: 192000, model: "Corolla", price: 1234, quantity: 1}]

const Vehicles = () => {
  // const [vehicles, setVehicles] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/vehicles");
  //       setVehicles(response.data);
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVehicles();
  // }, []); 

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="flex flex-col items-center pt-28">
      <h1>Vehicles</h1>
      <ul className="grid w-min">
        {vehicles.map((vehicle) => (
          <Link to={`/vehicles/${vehicle.vid}`}>

          <li key={vehicle.vid}><VehicleCard car={vehicle}/></li> 
          </Link>
        ))}
      </ul>

    </div>
  );
};

export default Vehicles;