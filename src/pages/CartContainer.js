// CartContainer.js
import { useState } from 'react';
import Cart from './Cart';
import {Alert, Snackbar} from "@mui/material"; // assuming Cart.js or Cart.jsx is in the same folder

const CartContainer = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Toyota Corolla 2021',
            price: 18000,
            quantity: 1,
            imageUrl: 'https://via.placeholder.com/100x60?text=Toyota',
        },
        {
            id: 2,
            name: 'Honda Civic 2022',
            price: 22000,
            quantity: 2,
            imageUrl: 'https://via.placeholder.com/100x60?text=Honda',
        },
    ]);

    console.log('Cart Items in CartContainer:', cartItems); // should show 2 items

    const onRemoveItem = (id) => {
        const removedItem = cartItems.find((item) => item.id === id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setSnackbar({ open: true, message: `${removedItem.name} removed`, severity: 'info' });
    };

    const onUpdateQuantity = (id, newQty) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
            )
        );
    };

    const onCheckout = () => {
        alert('Proceeding to checkout...');
    };

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };



    return (
        <>
            <Cart
                cartItems={cartItems}
                onRemoveItem={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
                onCheckout={onCheckout}
            />

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
        </>
    );
};

export default CartContainer;
