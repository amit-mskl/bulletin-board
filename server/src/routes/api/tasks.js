const express = require('express');
const TaskService = require('../../services/TaskService');
const { User } = require('../../models');

const router = express.Router();

// Middleware to find or create user based on Slack user ID
const findOrCreateUser = async (req, res, next) => {
  try {
    const slackUserId = req.headers['x-slack-user-id'] || req.body.slackUserId || 'test-user';
    
    let user = await User.findOne({ where: { slackUserId } });
    
    if (!user) {
      user = await User.create({
        slackUserId,
        name: req.headers['x-slack-user-name'] || 'Test User'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Error finding/creating user:', error);
    res.status(500).json({ error: 'User authentication failed' });
  }
};

// Apply user middleware to all routes
router.use(findOrCreateUser);

// GET /api/tasks - Get all tasks for current user
router.get('/', async (req, res) => {
  try {
    const { status, dueSoon } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (dueSoon === 'true') filters.dueSoon = true;
    
    const tasks = await TaskService.getUserTasks(req.user.id, filters);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/:id - Get specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await TaskService.getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      userId: req.user.id
    };
    
    // Validate required fields
    if (!taskData.title) {
      return res.status(400).json({ error: 'Task title is required' });
    }
    
    const task = await TaskService.createTask(taskData);
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
  try {
    const task = await TaskService.updateTask(req.params.id, req.body, req.user.id);
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks/:id/updates - Add update to task
router.post('/:id/updates', async (req, res) => {
  try {
    const { content, attachments } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Update content is required' });
    }
    
    const update = await TaskService.addTaskUpdate(
      req.params.id, 
      req.user.id, 
      content, 
      attachments
    );
    
    res.status(201).json(update);
  } catch (error) {
    console.error('Error adding task update:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
  try {
    const result = await TaskService.deleteTask(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/summary/weekly - Get weekly summary
router.get('/summary/weekly', async (req, res) => {
  try {
    const summary = await TaskService.getWeeklySummary();
    res.json(summary);
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;