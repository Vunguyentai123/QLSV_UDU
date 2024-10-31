const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vu31122005',
    database: 'todolist_app',
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err.stack);
        return;
    }
    console.log('Connection established');
});

module.exports = db;