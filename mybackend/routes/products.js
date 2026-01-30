const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with optional filtering
router.get('/', async (req, res) => {
    try {
        const { category, search, featured } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }
        if (featured) {
            query.featured = true;
        }
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new product (admin)
router.post('/', async (req, res) => {
    console.log('📦 POST /api/products - Request Body:', req.body);
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        console.log('✅ Product saved:', newProduct.name);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('❌ Error saving product:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete product (admin)
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
