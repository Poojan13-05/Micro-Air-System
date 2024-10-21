const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Import routes
const ownerAuthRoutes = require('./routes/ownerAuth');
const customerRoutes = require('./routes/customer');
const amcRoutes = require('./routes/amc');
const serviceRoutes = require('./routes/service');
const scheduleRoutes = require('./routes/schedule');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS for cross-origin requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/owners', ownerAuthRoutes); // Owner authentication routes
app.use('/api/customer', customerRoutes); // Customer routes
app.use('/api/amc', amcRoutes); // AMC routes
app.use('/api/service', serviceRoutes); // Service routes
app.use('/api/schedule', scheduleRoutes); // Schedule routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the AC Service Management API');
});

// Error handling middleware (optional, can customize this further)
app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
