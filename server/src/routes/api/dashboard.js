const express = require('express');
const TaskService = require('../../services/TaskService');
const ClaudeService = require('../../services/ClaudeService');

const router = express.Router();

// GET /api/dashboard/weekly - Get AI-powered weekly summary
router.get('/weekly', async (req, res) => {
  try {
    // Get raw weekly data
    const weeklyData = await TaskService.getWeeklySummary();
    
    // Generate AI summary and celebrations
    const [aiSummary, celebrations, patterns] = await Promise.all([
      ClaudeService.generateWeeklySummary(weeklyData.tasks),
      ClaudeService.detectCelebrations(weeklyData.tasks),
      ClaudeService.analyzeTeamPatterns(weeklyData)
    ]);

    res.json({
      metrics: {
        totalTasks: weeklyData.totalTasks,
        completed: weeklyData.completed,
        inProgress: weeklyData.inProgress,
        blocked: weeklyData.blocked,
        overdue: weeklyData.overdue
      },
      summary: aiSummary,
      celebrations,
      patterns,
      rawTasks: weeklyData.tasks
    });
  } catch (error) {
    console.error('Error generating weekly dashboard:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/dashboard/celebrations - Get current celebrations
router.get('/celebrations', async (req, res) => {
  try {
    const weeklyData = await TaskService.getWeeklySummary();
    const celebrations = await ClaudeService.detectCelebrations(weeklyData.tasks);
    
    res.json(celebrations);
  } catch (error) {
    console.error('Error getting celebrations:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;