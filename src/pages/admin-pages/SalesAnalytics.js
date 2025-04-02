import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import API from "../../globals";

const SalesAnalytics = () => {
    const [monthlySales, setMonthlySales] = useState([]);
    const [vehicleTypeSales, setVehicleTypeSales] = useState([]);
    const [profitTrend, setProfitTrend] = useState([]);

    useEffect(() => {
        axios.get(`${API.BASE_URL}/dashboard/monthly`)
            .then(res => setMonthlySales(res.data))
            .catch(err => console.error('Monthly sales fetch failed:', err));

        axios.get(`${API.BASE_URL}/dashboard/vehicle-types`)
            .then(res => {
                // PieChart expects id, value, and label
                const formatted = res.data.map((item, index) => ({
                    id: index,
                    value: item.count,
                    label: item.type
                }));
                setVehicleTypeSales(formatted);
            })
            .catch(err => console.error('Vehicle type fetch failed:', err));

        axios.get(`${API.BASE_URL}/dashboard/profit`)
            .then(res => setProfitTrend(res.data))
            .catch(err => console.error('Profit trend fetch failed:', err));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Dealership Dashboard</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Monthly Sales</Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: monthlySales.map(d => d.month) }]}
                            series={[{ data: monthlySales.map(d => d.sales), label: 'Vehicles Sold' }]}
                            width={500}
                            height={300}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Sales by Vehicle Type</Typography>
                        <PieChart
                            series={[{ data: vehicleTypeSales }]}
                            width={500}
                            height={300}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Profit Trend</Typography>
                        <LineChart
                            xAxis={[{ data: profitTrend.map(d => d.month) }]}
                            series={[{ data: profitTrend.map(d => d.profit), label: 'Profit ($)' }]}
                            width={1000}
                            height={300}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SalesAnalytics;
