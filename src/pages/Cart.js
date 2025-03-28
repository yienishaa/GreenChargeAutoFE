//Cart with a list of items with image, qty, total, tax calculations
//Ability to increase/decrease qty, remove items

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Stack, TextField, Typography} from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function Cart() {
    return (
        <Box className="pt-28 px-10">
            <Box

                sx={{
                    border: 1,
                    borderRadius: 4,
                    borderColor: "secondary.gray",
                }}
            >
                <Stack direction="row" spacing={0}>
                    {/* Left Side - Form */}
                    <Box sx={{ width: "70%", px: 4 }} pt={4} pb={6}>
                        <TableContainer component={Paper}>
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Qty</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* Right Side - Green Box */}
                    <Box
                        sx={{
                            width: "30%",
                            backgroundColor: "background.lime",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <Stack direction="column" spacing={2}>
                            <Typography color="text.primary" variant="body1">Cart Total</Typography>
                                <TableContainer component={Paper}>
                                    <Table  aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sub Total</TableCell>
                                                <TableCell>$</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell>$</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            <Typography color="text.primary" variant="body1">Calculate Shipping</Typography>

                        </Stack>

                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
export default Cart;
