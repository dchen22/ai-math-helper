const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database
const db = new sqlite3.Database(path.join(__dirname, 'problems.db'), (err) => {
    if (err) {
        console.error('Error initializing database:', err);
    } else {
        console.log('Connected to the database.');
        createTables();
    }
});

// Create problems table
function createTables() {
    db.run(`
        CREATE TABLE IF NOT EXISTS problems (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            problem_text TEXT NOT NULL,
            problem_type TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Add problem
function addProblem(problemText, problemType, callback) {
    db.run('INSERT INTO problems (problem_text, problem_type) VALUES (?, ?)', 
        [problemText, problemType], 
        function(err) {
            callback(err, this.lastID);
        }
    );
}

// Get all problems
function getProblems(callback) {
    db.all('SELECT * FROM problems ORDER BY created_at DESC', (err, rows) => {
        callback(err, rows);
    });
}

// Export functions
module.exports = {
    addProblem,
    getProblems
};
