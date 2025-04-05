import {
    Typography,
    Container,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Divider,
    Snackbar,
    Alert,
    Box
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, []);
    
    const { cartItems, onCheckout } = useCart();
    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        creditCard: "",
        expiry: "",
        cvv: "",
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleChange = (e) => {
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (Object.values(shippingInfo).some(val => !val.trim())) {
            setSnackbar({ open: true, message: "Please fill all fields.", severity: "error" });
            return;
        }

        try {
            console.log("cartItems:", cartItems);

            const payload = {
                fname: shippingInfo.fullName.split(" ")[0] || shippingInfo.fullName,
                lname: shippingInfo.fullName.split(" ")[1] || "",
                address: {
                    street: shippingInfo.address,
                    city: shippingInfo.city,
                    postalCode: shippingInfo.postalCode
                },
                cart: cartItems.map(item => ({
                    vid: item.vid, 
                    quantity: item.quantity
                }))
            };

            const response = await axios.post(`${API.BASE_URL}/orders/checkout`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Order placed:", response.data);

            onCheckout();
            setSnackbar({ open: true, message: "Order placed successfully!", severity: "success" });

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (error) {
            console.error("Checkout failed:", error);
            setSnackbar({ open: true, message: "Checkout failed. Try again.", severity: "error" });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 12 }}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Shipping & Payment Info</Typography>
                            <TextField fullWidth label="Full Name" name="fullName" margin="normal" value={shippingInfo.fullName} onChange={handleChange} />
                            <TextField fullWidth label="Address" name="address" margin="normal" value={shippingInfo.address} onChange={handleChange} />
                            <TextField fullWidth label="City" name="city" margin="normal" value={shippingInfo.city} onChange={handleChange} />
                            <TextField fullWidth label="Postal Code" name="postalCode" margin="normal" value={shippingInfo.postalCode} onChange={handleChange} />
                            <TextField fullWidth label="Credit Card Number" name="creditCard" margin="normal" value={shippingInfo.creditCard} onChange={handleChange} />
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Expiry Date (MM/YY)" name="expiry" margin="normal" value={shippingInfo.expiry} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="CVV" name="cvv" margin="normal" value={shippingInfo.cvv} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Order Summary</Typography>
                            <Box display="flex" justifyContent="space-between" my={1}>
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                                <span>Tax (10%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between" fontWeight="bold" my={1}>
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handleSubmit}
                            >
                                Place Order
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Checkout;
