const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        // Note: In a real app, hash password here (e.g. bcrypt)
        user = new User({
            name,
            email,
            password, // Storing plain text for this demo as requested/implied by context
            role: role || 'user'
        });

        await user.save();

        res.status(201).json({
            message: 'Registration successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check hardcoded admin for fallback safety
        if (email === 'admin@sports.com' && password === 'admin123') {
            return res.json({
                message: 'Login successful',
                user: {
                    name: 'Admin',
                    email: 'admin@sports.com',
                    role: 'admin'
                }
            });
        }

        // Check DB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password (plain text comparison for this demo)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
