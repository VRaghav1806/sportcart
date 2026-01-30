const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart by session ID
router.get('/:sessionId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.params.sessionId }).populate('items.product');
        if (!cart) {
            cart = new Cart({ sessionId: req.params.sessionId, items: [] });
            await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/', async (req, res) => {
    console.log('🛒 POST /api/cart - Request Body:', req.body);
    try {
        const { sessionId, productId, quantity } = req.body;

        // Get product details
        const product = await Product.findById(productId);
        if (!product) {
            console.log('❌ Product not found:', productId);
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check stock
        if (product.stock < quantity) {
            console.log('❌ Insufficient stock:', product.name);
            return res.status(400).json({ message: 'Insufficient stock' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ sessionId });
        if (!cart) {
            cart = new Cart({ sessionId, items: [] });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();
        console.log('✅ Cart saved for session:', sessionId);
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        console.error('❌ Error in POST /api/cart:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update cart item quantity
router.put('/:sessionId', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            await cart.save();
            await cart.populate('items.product');
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/:sessionId/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
