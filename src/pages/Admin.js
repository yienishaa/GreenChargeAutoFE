import React, { useEffect, useState } from "react";
import axios from "axios";
import {Box, Grid} from "@mui/material";
import API from "../globals";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {

                const response = await axios.get(`${API.BASE_URL}/vehicles/admin/all`);
                setVehicles(response.data); // Assuming the response data is an array of vehicles

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

        <>
            <Grid container spacing={2}>
                <Grid item>
                    {vehicles.map((v) => (
                        <li key={v.id}>
                            <strong>{v.brand} {v.model}</strong><br/>
                            <img src={`${API.S3_BUCKET}/${v.image}`}  />

                        </li>
                    ))}

                </Grid>
            </Grid>
        </>
    );
};

export default Vehicles;