const { sequelize } = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const TaskUpdate = require('./TaskUpdate');

// Define associations
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Task.hasMany(TaskUpdate, { foreignKey: 'taskId', as: 'updates' });
TaskUpdate.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

User.hasMany(TaskUpdate, { foreignKey: 'userId', as: 'updates' });
TaskUpdate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Task,
  TaskUpdate,
};