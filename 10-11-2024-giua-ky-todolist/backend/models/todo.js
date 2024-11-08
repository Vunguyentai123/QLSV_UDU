const db = require('../configs/database');

const Todo = {
    getAll: (callback) => {
        db.query('SELECT * FROM todos', callback);
    },
    create: (title, due_date, callback) => {
        db.query('INSERT INTO todos (title, due_date) VALUES (?, ?)', [title, due_date], callback);
    },
    update: (id, title, completed, due_date, callback) => {
        db.query('UPDATE todos SET title = ? , due_date = ?, completed = ? WHERE id = ?', [title, due_date, completed, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM todos WHERE id = ?', [id], callback);
    }
};

module.exports = Todo;