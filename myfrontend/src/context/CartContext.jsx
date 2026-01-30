import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, addToCart as addToCartAPI, updateCartItem, removeFromCart as removeFromCartAPI } from '../utils/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load cart on mount
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            const data = await fetchCart();
            setCart(data);
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const updatedCart = await addToCartAPI(productId, quantity);
            setCart(updatedCart);
            return true;
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const updatedCart = await updateCartItem(productId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    };

    const removeItem = async (productId) => {
        try {
            const updatedCart = await removeFromCartAPI(productId);
            setCart(updatedCart);
        } catch (error) {
            console.error('Failed to remove item:', error);
            throw error;
        }
    };

    const clearCart = () => {
        setCart({ ...cart, items: [], totalAmount: 0 });
    };

    const cartCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                cartCount,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                refreshCart: loadCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
