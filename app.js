const express = require('express');


// Load environment file
require('dotenv').config();

// SetUp db connection
require('./config/db');

// Importing roots
const apiRoutes = require('./routes/api.routes');
const app = express();

app.use('/api', apiRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})