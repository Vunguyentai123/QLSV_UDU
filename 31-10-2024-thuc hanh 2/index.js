const express = require('express');
const app = express();
const port = 3000;
const db = require('./database');

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// GET endpoint
app.get('/', (req, res) => {
    db.query('SELECT * FROM todos', (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.json(result);
    });
});

// POST endpoint
app.post('/add', (req, res) => {
    const { title, description, due_date, completed } = req.body;
    db.query('INSERT INTO todos (title, description, due_date, completed) VALUES (?, ?, ?, ?)', [title, description, due_date, completed], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.status(201).send('Task added');
    });
});

// PUT endpoint
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, due_date, completed } = req.body;
    db.query('UPDATE todos SET title = ?, description = ?, due_date = ?, completed = ? WHERE id = ?', [title, description, due_date, completed, id], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.send('Task updated');
    });
});
// DELETE endpoint
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).send('Server error');
        }
        res.send('Task deleted');
    });
});
