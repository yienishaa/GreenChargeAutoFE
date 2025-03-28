// context/CartContext.js
import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
            value={{ cartItems, onRemoveItem, onUpdateQuantity, onCheckout, totalQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
