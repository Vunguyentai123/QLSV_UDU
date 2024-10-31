const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Giúp parse dữ liệu JSON
app.use('/todos', todoRoutes); // Sử dụng các route đã định nghĩa


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});