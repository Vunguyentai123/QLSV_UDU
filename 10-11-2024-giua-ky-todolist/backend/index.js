const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const cors = require('cors')

const app = express();
const port = 3001;
app.use(cors())
app.use(bodyParser.json());
app.use('/api', todoRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});