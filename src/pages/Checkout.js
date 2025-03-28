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
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
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

    const handleSubmit = () => {
        if (Object.values(shippingInfo).some(val => !val.trim())) {
            setSnackbar({ open: true, message: "Please fill all fields.", severity: "error" });
            return;
        }

        onCheckout(); // clear cart
        setSnackbar({ open: true, message: "Order placed successfully!", severity: "success" });

        setTimeout(() => {
            navigate("/"); // or /confirmation if you add a page
        }, 1500);
    };

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
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
