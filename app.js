const express = require('express');
const dotenv = require('dotenv');

// Load environment file
dotenv.config();

// SetUp db connection
require('./config/db');

// Importing routes
const apiRoutes = require('./routes/api.routes');

const app = express();

app.use(express.json()); // Body parsing middleware

app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});