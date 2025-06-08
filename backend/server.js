const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
