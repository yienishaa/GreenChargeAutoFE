import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import API from "../globals";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const loadCartItems = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setCartItems([]);
            return;
        }

        try {
            const response = await axios.get(`${API.BASE_URL}/shopping-cart/${userId}`);
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
        const payload = {
            cartItemId: id,
            quantity: newQty,
        };
        try {
            await axios.put(`${API.BASE_URL}/shopping-cart/update-cart`, payload);
            await loadCartItems();
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };

    const onCheckout = async (checkoutInfo) => {
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
        loadCartItems();
    }, []);

    return (
        <CartContext.Provider
            value={{ cartItems, setCartItems, onRemoveItem, onUpdateQuantity, onCheckout, totalQuantity, loadCartItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
