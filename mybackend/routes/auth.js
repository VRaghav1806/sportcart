const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Simple logic for demonstration: 
        // admin@sports.com -> admin
        // any other valid email -> user
        // In a real app, we would verify password and check DB

        let role = 'user';
        if (email === 'admin@sports.com' && password === 'admin123') {
            role = 'admin';
        } else if (password !== 'user123' && email !== 'admin@sports.com') {
            // For simplicity, let's treat any email with password 'user123' as a valid user
            // unless it's the admin one above.
        }

        const user = {
            email,
            role,
            name: email.split('@')[0]
        };

        res.json({
            message: 'Login successful',
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
