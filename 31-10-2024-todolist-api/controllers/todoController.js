const Todo = require('../models/todo');

exports.getAllTodos = (req, res) => {
    Todo.getAll((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

exports.createTodo = (req, res) => {
    const { title, description, due_date } = req.body;
    Todo.create(title, description, due_date, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(results);
        }
    });
};

exports.updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, description, completed, due_date } = req.body;
    Todo.update(id, title, description, completed, due_date, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    Todo.delete(id, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};