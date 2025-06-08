const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Add user to database
        db.addUser(email, hashedPassword, (err, id) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            
            // Create JWT token
            const token = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Get user from database
        db.getUserByEmail(email, (err, user) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            if (!user) return res.status(401).json({ error: 'Invalid credentials' });
            
            // Verify password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).json({ error: 'Password verification error' });
                if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
                
                // Create JWT token
                const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.json({ token });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
