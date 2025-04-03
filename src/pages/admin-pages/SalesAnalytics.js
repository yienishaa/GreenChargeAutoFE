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
    const [profitTrend, setProfitTrend] = useState({});

    useEffect(() => {
        // Fetch Monthly Sales
        axios.get(`${API.BASE_URL}/dashboard/monthly`)
            .then(res => setMonthlySales(res.data))
            .catch(err => console.error('Monthly sales fetch failed:', err));

        // Fetch Vehicle brand Sales
        axios.get(`${API.BASE_URL}/dashboard/vehicle-types`)
            .then(res => {
                const formatted = res.data.map((item, index) => ({
                    id: index,
                    value: item.count,
                    label: item.type
                }));
                setVehicleTypeSales(formatted);
            })
            .catch(err => console.error('Vehicle type fetch failed:', err));

        // Fetch Profit Trend
        axios.get(`${API.BASE_URL}/dashboard/profit`)
            .then(res => {
                const monthOrder = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                const grouped = {};
                res.data.forEach(item => {
                    if (!grouped[item.year]) grouped[item.year] = [];
                    grouped[item.year].push(item);
                });

                for (const year in grouped) {
                    grouped[year].sort((a, b) =>
                        monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
                    );
                }

                setProfitTrend(grouped);
            })
            .catch(err => console.error('Profit trend fetch failed:', err));
    }, []);

    return (
        <Container maxWidth="lg" sx={{  mb: 4, pt:5 }}>
            <Typography variant="h4" gutterBottom>Performance Dashboard</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Monthly Sales</Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: monthlySales.map(d => `${d.month.slice(0, 3)} ${d.year}`) }]}
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
                    <Paper sx={{ p: 2, minHeight: 300, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>Profit Trend</Typography>
                        {Object.keys(profitTrend).length === 0 ? (
                            <Typography color="textSecondary" sx={{ mt: 2 }}>
                                No profit data available.
                            </Typography>
                        ) : (
                            <LineChart
                                xAxis={[{
                                    data: [
                                        "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"
                                    ],
                                    label: 'Month',
                                    scaleType: 'band',
                                }]}
                                series={Object.keys(profitTrend).map(year => ({
                                    data: profitTrend[year].map(p => p.profit),
                                    label: `Profit ${year}`,
                                    showMark: true,
                                }))}
                                width={1000}
                                height={300}
                            />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SalesAnalytics;
