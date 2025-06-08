const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database
const db = new sqlite3.Database(path.join(__dirname, 'users.db'), (err) => {
    if (err) {
        console.error('Error initializing database:', err);
    } else {
        console.log('Connected to the database.');
        createTables();
    }
});

// Create users table
function createTables() {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Add user
function addUser(email, password, callback) {
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], function(err) {
        callback(err, this.lastID);
    });
}

// Get user by email
function getUserByEmail(email, callback) {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        callback(err, row);
    });
}

// Export functions
module.exports = {
    addUser,
    getUserByEmail
};
