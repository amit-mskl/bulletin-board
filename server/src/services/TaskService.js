const { Task, TaskUpdate, User } = require('../models');
const { Op } = require('sequelize');

class TaskService {
  // Create a new task
  async createTask(taskData) {
    try {
      const task = await Task.create(taskData);
      return await this.getTaskById(task.id);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  // Get task by ID with user and updates
  async getTaskById(taskId) {
    try {
      const task = await Task.findByPk(taskId, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'slackUserId']
          },
          {
            model: TaskUpdate,
            as: 'updates',
            include: [{
              model: User,
              as: 'user',
              attributes: ['name']
            }],
            order: [['createdAt', 'DESC']]
          }
        ]
      });

      return task;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw new Error('Failed to fetch task');
    }
  }

  // Get all tasks for a user
  async getUserTasks(userId, filters = {}) {
    try {
      const whereClause = { userId };

      // Add status filter if provided
      if (filters.status) {
        if (Array.isArray(filters.status)) {
          whereClause.status = { [Op.in]: filters.status };
        } else {
          whereClause.status = filters.status;
        }
      }

      // Add due date filter if provided
      if (filters.dueSoon) {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        whereClause.dueDate = {
          [Op.lte]: nextWeek
        };
      }

      const tasks = await Task.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name']
          },
          {
            model: TaskUpdate,
            as: 'updates',
            limit: 3,
            order: [['createdAt', 'DESC']]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      return tasks;
    } catch (error) {
      console.error('Error fetching user tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  }

  // Update task status and details
  async updateTask(taskId, updateData, userId) {
    try {
      const task = await Task.findByPk(taskId);
      
      if (!task) {
        throw new Error('Task not found');
      }

      // Update task fields
      await task.update(updateData);

      // Create update record if content provided
      if (updateData.updateContent) {
        await TaskUpdate.create({
          taskId: task.id,
          userId: userId,
          content: updateData.updateContent,
          statusChange: updateData.status !== task.status ? updateData.status : null
        });
      }

      return await this.getTaskById(taskId);
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  }

  // Add update to task
  async addTaskUpdate(taskId, userId, content, attachments = []) {
    try {
      const update = await TaskUpdate.create({
        taskId,
        userId,
        content,
        attachments
      });

      return await TaskUpdate.findByPk(update.id, {
        include: [{
          model: User,
          as: 'user',
          attributes: ['name']
        }]
      });
    } catch (error) {
      console.error('Error adding task update:', error);
      throw new Error('Failed to add update');
    }
  }

  // Get weekly summary for team
  async getWeeklySummary(teamId = null) {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const whereClause = {
        createdAt: {
          [Op.gte]: oneWeekAgo
        }
      };

      if (teamId) {
        // Add team filter when we implement teams
        // whereClause.teamId = teamId;
      }

      const tasks = await Task.findAll({
        where: whereClause,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['name', 'slackUserId']
          },
          {
            model: TaskUpdate,
            as: 'updates',
            where: {
              createdAt: {
                [Op.gte]: oneWeekAgo
              }
            },
            required: false
          }
        ]
      });

      // Calculate summary stats
      const summary = {
        totalTasks: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in_progress').length,
        blocked: tasks.filter(t => t.status === 'blocked').length,
        overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length,
        tasks: tasks
      };

      return summary;
    } catch (error) {
      console.error('Error generating weekly summary:', error);
      throw new Error('Failed to generate summary');
    }
  }

  // Delete task
  async deleteTask(taskId, userId) {
    try {
      const task = await Task.findByPk(taskId);
      
      if (!task) {
        throw new Error('Task not found');
      }

      // Only allow task owner to delete
      if (task.userId !== userId) {
        throw new Error('Not authorized to delete this task');
      }

      // Delete all updates first
      await TaskUpdate.destroy({ where: { taskId } });
      
      // Delete task
      await task.destroy();

      return { success: true, message: 'Task deleted successfully' };
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

module.exports = new TaskService();