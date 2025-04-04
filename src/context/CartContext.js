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

    const onCheckout = () => {
        alert('Proceeding to checkout...');
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
