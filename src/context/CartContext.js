import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import API from "../globals";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    const loadCartItems = async (uid = userId) => {
        if (!uid) {
            setCartItems([]);
            return;
        }

        try {
            const payload = {
                userId: localStorage.getItem("userId")
            };
            const response = await axios.post(`${API.BASE_URL}/shopping-cart/get-cart`,payload);
            setCartItems(response.data);
            console.log("Cart loaded:", response.data);
        } catch (error) {
            console.error("Failed to load cart items:", error);
        }
    };

    const onRemoveItem = async (id) => {
        try {
            await axios.delete(`${API.BASE_URL}/shopping-cart/${id}/delete-item`);
            await loadCartItems();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const onUpdateQuantity = async (id, newQty) => {
        try {
            await axios.put(`${API.BASE_URL}/shopping-cart/update-cart`, {
                cartItemId: id,
                quantity: newQty,
            });
            await loadCartItems();
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };


    const onCheckout = async (checkoutInfo) => {
        if (!checkoutInfo) {
            console.error("checkoutInfo is required");
            return;
        }
        const payload = {
            fname: checkoutInfo.fname,
            lname: checkoutInfo.lname,
            address: {
                street: checkoutInfo.street,
                city: checkoutInfo.city,
                postalCode: checkoutInfo.postalCode
            },
            cart: cartItems.map(item => ({
                vid: item.vid,
                quantity: item.quantity
            }))
        };
    
        try {
            const response = await axios.post(`${API.BASE_URL}/orders/checkout`, payload);
            console.log("Order placed:", response.data);
            setCartItems([]); // Clear cart
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed!");
        }

    };

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);


    useEffect(() => {
        const interval = setInterval(() => {
            const uid = localStorage.getItem("userId");
            if (uid !== userId) {
                setUserId(uid);
                loadCartItems(uid); // use the latest ID
            }
        }, 500);

        return () => clearInterval(interval);
    }, [userId]);


    useEffect(() => {
        loadCartItems(userId);
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                onRemoveItem,
                onUpdateQuantity,
                onCheckout,
                totalQuantity,
                loadCartItems,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
