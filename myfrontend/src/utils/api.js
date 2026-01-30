const API_URL = (import.meta.env.URL || 'http://localhost:5000') + '/api';

// Generate session ID for cart
export const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

// Products API
export const fetchProducts = async ({ category, search, featured } = {}) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (featured) params.append('featured', 'true');

    const url = `${API_URL}/products${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const fetchProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
};

// Cart API
export const fetchCart = async () => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/cart/${sessionId}`);
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
};

export const addToCart = async (productId, quantity = 1) => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, productId, quantity })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add to cart');
    }
    return response.json();
};

export const updateCartItem = async (productId, quantity) => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/cart/${sessionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
};

export const removeFromCart = async (productId) => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/cart/${sessionId}/${productId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to remove from cart');
    return response.json();
};

export const clearCart = async () => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/cart/${sessionId}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
};

// Orders API
export const createOrder = async (orderData) => {
    const sessionId = getSessionId();
    const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderData, sessionId })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
    }
    return response.json();
};

export const fetchOrder = async (orderId) => {
    const response = await fetch(`${API_URL}/orders/${orderId}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
};

export const fetchOrderByNumber = async (orderNumber) => {
    const response = await fetch(`${API_URL}/orders/number/${orderNumber}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
};

export const addProduct = async (productData) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add product');
    }
    return response.json();
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete product');
    }
    return response.json();
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }
    return response.json();
};
