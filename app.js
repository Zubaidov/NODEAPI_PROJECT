const express = require('express');


// Load environment file
require('dotenv').config();

// SetUp db connection
require('./config/db');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})