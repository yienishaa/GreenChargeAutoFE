
import {
    Typography,
    Container,
    Grid,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Stack,
    TextField,
    Box,
    Collapse,
    Snackbar,
    Alert
} from "@mui/material";

import CancelIcon from '@mui/icons-material/Cancel';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';


import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Cart() {
    const { cartItems, onRemoveItem, onUpdateQuantity, onCheckout, loadCartItems } = useCart();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const totalPrice = subtotal + tax;

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleRemove = (id) => {
        console.log(cartItems);
        const item = cartItems.find((item) => item.id === id);
        if (item) {
            onRemoveItem(id);
            setSnackbar({ open: true, message: `${item.vehicleName} removed`, severity: 'info' });
        }
    };

    const handleUpdateCart = (item, command) => {

        if(command === "reduce") {
            onUpdateQuantity(item.id, item.quantity - 1);
        }
        else if(command === "increase") {
            onUpdateQuantity(item.id, item.quantity + 1);
        }

    }

    useEffect(() => {
        loadCartItems();

    }, []);

    useEffect(() => {
        console.log("Cart items loaded:", cartItems);
    }, [cartItems]);

    return (
        <Container sx={{ py: 16 }}>
            <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
                <Box sx={{border: 1, borderRadius: 4, borderColor: "secondary.gray"}}>
                    <Stack direction="row" >
                        <Box sx={{width: "70%"}}>
                            <Box sx={{bgcolor: 'background.default', borderRadius: 4}}>
                                <Box>
                                    {cartItems.length === 0 ? (
                                        <Box textAlign="center" py={5}>
                                            <Typography variant="h6" gutterBottom>Your cart is empty</Typography>
                                            <Button variant="outlined" onClick={() => navigate('/vehicles')}>
                                                Continue Shopping
                                            </Button>
                                        </Box>
                                    ) : (
                                        <List>
                                            {cartItems.map((item, index) => (
                                                <Collapse key={`${item.id}-${index}`} in={true} timeout={400}>
                                                <ListItem alignItems="flex-start" sx={{ mb: 2 }}>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                variant="rounded"

                                                                src={`https://greencharge-catalog.s3.us-east-1.amazonaws.com/${item.imageUrl}`}

                                                                sx={{ width: 180, height: 100, mr: 2 }}
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={item.vehicleName}
                                                            secondary={`$${item.price.toFixed(2)} each`}
                                                            slotProps={{
                                                                primary: {
                                                                    sx: { color: 'text.dark', fontWeight: 'bold' },
                                                                },
                                                                secondary: {
                                                                    sx: { color: 'text.green' },
                                                                },
                                                            }}
                                                        />
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <Button
                                                                onClick={() => handleUpdateCart(item, "reduce")}
                                                                disabled={item.quantity <= 1}
                                                            ><RemoveIcon fontSize="small" />
                                                            </Button>
                                                            <TextField
                                                                size="small"
                                                                value={item.quantity}
                                                                sx={{ width: 50 }}
                                                                inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                                                            />
                                                            <Button onClick={() => handleUpdateCart(item, "increase")}>
                                                                <AddIcon fontSize="small" />
                                                            </Button>
                                                        </Stack>
                                                        <Typography sx={{ ml: 2 , color: 'text.dark' }}>
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </Typography>
                                                        <Button onClick={() => handleRemove(item.id)} color="error" sx={{ ml: 2 }}>
                                                            <CancelIcon/>
                                                        </Button>
                                                    </ListItem>
                                                </Collapse>
                                            ))}
                                        </List>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{width: "30%", backgroundColor: "background.lime", display: "flex", alignItems: "center", justifyContent: "center",
                            borderBottomRightRadius:4, borderTopRightRadius:4, py:4}}>
                            <Box sx={{borderBottomRightRadius:4, borderTopRightRadius:4}}>
                                <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 'bold'}}>Order Summary</Typography>
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
                            </Box>
                        </Box>
                    </Stack>
                </Box>


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