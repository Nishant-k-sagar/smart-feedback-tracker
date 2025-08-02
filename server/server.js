require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/feedback', require('./routes/feedback'));

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || '0.0.0.0';

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(PORT, HOST, () => {
  console.log(`Server started on port ${PORT}`);
});
