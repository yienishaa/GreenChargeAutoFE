
import {
    Typography,
    Container,
    Grid,
    Button,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Stack,
    TextField,
    Divider,
    Box,
    Collapse,
    Snackbar,
    Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function Cart() {
    const { cartItems, onRemoveItem, onUpdateQuantity, onCheckout } = useCart();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const totalPrice = subtotal + tax;

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleRemove = (id) => {
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            onRemoveItem(id);
            setSnackbar({ open: true, message: `${item.name} removed`, severity: 'info' });
        }
    };


    return (
        <Container sx={{ py: 16 }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>

            <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            {cartItems.length === 0 ? (
                                <Box textAlign="center" py={5}>
                                    <Typography variant="h6" gutterBottom>Your cart is empty</Typography>
                                    <Button variant="outlined" onClick={() => navigate('/vehicles')}>
                                        Continue Shopping
                                    </Button>
                                </Box>
                            ) : (
                                <List>
                                    {cartItems.map((item) => (
                                        <Collapse key={item.id} in={true} timeout={400}>
                                            <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        variant="rounded"
                                                        src={item.imageUrl}
                                                        sx={{ width: 80, height: 80, mr: 2 }}
                                                    />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.name}
                                                    secondary={`$${item.price.toFixed(2)} each`}
                                                />
                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                    <Button
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <TextField
                                                        size="small"
                                                        value={item.quantity}
                                                        sx={{ width: 50 }}
                                                        inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                    />
                                                    <Button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                                                </Stack>
                                                <Typography sx={{ ml: 2 }}>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                                <Button onClick={() => handleRemove(item.id)} color="error" sx={{ ml: 2 }}>
                                                    Remove
                                                </Button>
                                            </ListItem>
                                        </Collapse>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Order Summary</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
                            <Typography>Tax (10%): ${tax.toFixed(2)}</Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Total: ${totalPrice.toFixed(2)}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                                onClick={onCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};
export default Cart;