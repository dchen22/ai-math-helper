const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Log problem type
app.post('/api/analyze', (req, res) => {
    const { type } = req.body;
    console.log('Problem Type:', type);
    
    // Save to database
    db.addProblem(req.body.problem, type, (err) => {
        if (err) {
            console.error('Error saving problem:', err);
            res.status(500).json({ error: 'Failed to save problem' });
            return;
        }
        
        res.json({ success: true });
    });
});

// Get all problems
app.get('/api/problems', (req, res) => {
    db.getProblems((err, problems) => {
        if (err) {
            console.error('Error fetching problems:', err);
            res.status(500).json({ error: 'Failed to fetch problems' });
            return;
        }
        
        res.json(problems);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
