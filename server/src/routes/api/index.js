const express = require('express');
const taskRoutes = require('./tasks');
const dashboardRoutes = require('./dashboard');

const router = express.Router();

// API Routes
router.use('/tasks', taskRoutes);
router.use('/dashboard', dashboardRoutes);

// API health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;