require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { testConnection, syncDatabase } = require('./config/database');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Slack routes - Start Socket Mode after server starts
const SlackService = require('./services/SlackService');
if (SlackService.initialized) {
  // Use actual Slack routes if properly configured
  const slackRoutes = require('./routes/slack');
  app.use('/slack', slackRoutes);
} else {
  // Fallback for unconfigured Slack
  app.use('/slack', (req, res) => {
    res.status(503).json({ 
      error: 'Slack integration not configured',
      message: 'Please configure SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET in .env file'
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Initialize database and start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Sync database models
    await syncDatabase();
    
    // Start server
    app.listen(PORT, async () => {
      console.log(`🚀 Bulletin Board Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      
      // Start Slack Socket Mode after server is running
      if (SlackService.initialized && process.env.SLACK_APP_TOKEN) {
        try {
          await SlackService.app.start();
          console.log('⚡ Slack Socket Mode connection established!');
        } catch (error) {
          console.error('❌ Failed to start Slack Socket Mode:', error.message);
        }
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;