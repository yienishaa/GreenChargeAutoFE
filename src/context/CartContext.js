// context/CartContext.js
import { createContext, useContext, useState } from 'react';
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const loadCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/shopping-cart/1");
            setCartItems(response.data); // make sure this matches your backend response
            console.log(response.data);
        } catch (error) {
            console.error("Failed to load cart items:", error);
        }
    };

    const onRemoveItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
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

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cartItems, onRemoveItem, onUpdateQuantity, onCheckout, totalQuantity, loadCartItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
