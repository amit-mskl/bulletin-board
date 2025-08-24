const express = require('express');
const SlackService = require('../services/SlackService');

const router = express.Router();

// Use Slack Bolt's built-in Express middleware
router.use('/', SlackService.getExpressMiddleware());

module.exports = router;