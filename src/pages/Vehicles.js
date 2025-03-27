import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "../components/Reviews";
import {Box, Grid, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";
import logo from "../images/logo.webp";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
/*
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
*/
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <img src={logo}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Vehicles;