const { App } = require('@slack/bolt');
const { User } = require('../models');

class SlackService {
  constructor() {
    // Only initialize if we have valid tokens
    if (process.env.SLACK_BOT_TOKEN && process.env.SLACK_SIGNING_SECRET) {
      const useSocketMode = !!process.env.SLACK_APP_TOKEN;
      
      this.app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
        socketMode: useSocketMode,
        appToken: useSocketMode ? process.env.SLACK_APP_TOKEN : undefined,
      });

      this.setupCommands();
      this.setupModals();
      this.initialized = true;
    } else {
      console.log('⚠️  Slack tokens not configured. Slack integration disabled.');
      this.initialized = false;
    }

    // Log initialization status
    if (this.initialized) {
      console.log('✅ Slack service initialized successfully');
    }
  }

  async startSocketMode() {
    try {
      await this.app.start();
      console.log('⚡ Slack Socket Mode connection established!');
    } catch (error) {
      console.error('❌ Failed to start Slack Socket Mode:', error.message);
    }
  }

  setupCommands() {
    // /create-task command
    this.app.command('/create-task', async ({ command, ack, respond, client }) => {
      await ack();

      try {
        await this.openTaskCreationModal(client, command.trigger_id, command.user_id, command.channel_id);
      } catch (error) {
        console.error('Error opening task creation modal:', error);
        await respond('Sorry, something went wrong. Please try again.');
      }
    });

    // /update-task command
    this.app.command('/update-task', async ({ command, ack, respond, client }) => {
      await ack();

      try {
        await this.openTaskUpdateModal(client, command.trigger_id, command.user_id, command.user_name);
      } catch (error) {
        console.error('Error opening task update modal:', error);
        await respond('Sorry, something went wrong. Please try again.');
      }
    });

    // /my-tasks command
    this.app.command('/my-tasks', async ({ command, ack, respond }) => {
      await ack();
      
      try {
        // Get user and their tasks
        const user = await this.findOrCreateUser(command.user_id, command.user_name);
        const TaskService = require('./TaskService');
        const tasks = await TaskService.getUserTasks(user.id);
        
        if (tasks.length === 0) {
          await respond({
            text: '📋 *Your Tasks*',
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: '📋 *Your Tasks*\n\nNo tasks found. Use `/create-task` to create your first task!'
                }
              }
            ]
          });
          return;
        }

        // Build task list
        const taskBlocks = [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `📋 *Your Tasks* (${tasks.length} total)`
            }
          },
          {
            type: 'divider'
          }
        ];

        tasks.forEach((task, index) => {
          const statusEmoji = {
            'pending': '⏳',
            'in_progress': '🔄',
            'completed': '✅',
            'blocked': '🚨'
          }[task.status] || '⏳';

          const priorityEmoji = {
            'low': '🟢',
            'medium': '🟡', 
            'high': '🔴'
          }[task.priority] || '🟡';

          const dueDate = task.dueDate ? 
            `📅 Due: ${new Date(task.dueDate).toLocaleDateString()}` : 
            '📅 No due date';

          taskBlocks.push({
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${statusEmoji} *${task.title}*\n${priorityEmoji} ${task.priority.toUpperCase()} • ${dueDate}\n${task.description || '_No description_'}`
            }
          });

          if (index < tasks.length - 1) {
            taskBlocks.push({ type: 'divider' });
          }
        });

        await respond({
          text: `📋 Your Tasks (${tasks.length} total)`,
          blocks: taskBlocks
        });

      } catch (error) {
        console.error('Error fetching user tasks:', error);
        await respond('❌ Failed to fetch your tasks. Please try again.');
      }
    });
  }

  setupModals() {
    // Handle task creation modal submission
    this.app.view('task_creation_modal', async ({ ack, body, view, client }) => {
      await ack();
      
      try {
        await this.handleTaskCreation(body, view, client);
      } catch (error) {
        console.error('Error handling task creation:', error);
      }
    });

    // Handle task update modal submission
    this.app.view('task_update_modal', async ({ ack, body, view, client }) => {
      await ack();
      
      try {
        await this.handleTaskUpdate(body, view, client);
      } catch (error) {
        console.error('Error handling task update:', error);
      }
    });
  }

  async openTaskCreationModal(client, triggerId, userId, channelId) {
    const modal = {
      type: 'modal',
      callback_id: 'task_creation_modal',
      title: {
        type: 'plain_text',
        text: '📋 Create New Task'
      },
      blocks: [
        {
          type: 'input',
          block_id: 'task_title',
          element: {
            type: 'plain_text_input',
            action_id: 'title_input',
            placeholder: {
              type: 'plain_text',
              text: 'e.g. Fix authentication bug in login flow'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Task Title'
          }
        },
        {
          type: 'input',
          block_id: 'task_description',
          element: {
            type: 'plain_text_input',
            action_id: 'description_input',
            multiline: true,
            placeholder: {
              type: 'plain_text',
              text: 'Add any context, requirements, or notes...'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Description & Notes'
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'due_date',
          element: {
            type: 'datepicker',
            action_id: 'date_picker',
            initial_date: this.getNextFriday(),
            placeholder: {
              type: 'plain_text',
              text: 'Select due date'
            }
          },
          label: {
            type: 'plain_text',
            text: 'Due Date'
          },
          optional: true
        },
        {
          type: 'input',
          block_id: 'priority',
          element: {
            type: 'static_select',
            action_id: 'priority_select',
            initial_option: {
              text: {
                type: 'plain_text',
                text: '🟡 Medium'
              },
              value: 'medium'
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: '🟢 Low'
                },
                value: 'low'
              },
              {
                text: {
                  type: 'plain_text',
                  text: '🟡 Medium'
                },
                value: 'medium'
              },
              {
                text: {
                  type: 'plain_text',
                  text: '🔴 High'
                },
                value: 'high'
              }
            ]
          },
          label: {
            type: 'plain_text',
            text: 'Priority'
          }
        }
      ],
      submit: {
        type: 'plain_text',
        text: 'Create Task'
      },
      private_metadata: JSON.stringify({
        userId,
        channelId
      })
    };

    await client.views.open({
      trigger_id: triggerId,
      view: modal
    });
  }

  async openTaskUpdateModal(client, triggerId, userId, userName) {
    try {
      // Get user and their tasks
      const user = await this.findOrCreateUser(userId, userName);
      const TaskService = require('./TaskService');
      const tasks = await TaskService.getUserTasks(user.id, { status: ['pending', 'in_progress', 'blocked'] });

      if (tasks.length === 0) {
        const modal = {
          type: 'modal',
          callback_id: 'no_tasks_modal',
          title: {
            type: 'plain_text',
            text: '🔄 Update Task'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '📋 No active tasks to update.\n\nUse `/create-task` to create a new task first!'
              }
            }
          ],
          close: {
            type: 'plain_text',
            text: 'Close'
          }
        };

        await client.views.open({
          trigger_id: triggerId,
          view: modal
        });
        return;
      }

      // Create task selection options
      const taskOptions = tasks.map(task => ({
        text: {
          type: 'plain_text',
          text: `${task.title} (${task.status})`,
        },
        value: task.id
      }));

      const modal = {
        type: 'modal',
        callback_id: 'task_update_modal',
        title: {
          type: 'plain_text',
          text: '🔄 Update Task'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Select a task to update:'
            }
          },
          {
            type: 'input',
            block_id: 'task_selection',
            element: {
              type: 'static_select',
              action_id: 'selected_task',
              placeholder: {
                type: 'plain_text',
                text: 'Choose a task...'
              },
              options: taskOptions
            },
            label: {
              type: 'plain_text',
              text: 'Task'
            }
          },
          {
            type: 'input',
            block_id: 'update_content',
            element: {
              type: 'plain_text_input',
              action_id: 'content_input',
              multiline: true,
              placeholder: {
                type: 'plain_text',
                text: 'What\'s the current status? Any progress or blockers?'
              }
            },
            label: {
              type: 'plain_text',
              text: 'Progress Update'
            }
          },
          {
            type: 'input',
            block_id: 'status_update',
            element: {
              type: 'static_select',
              action_id: 'status_select',
              placeholder: {
                type: 'plain_text',
                text: 'Update status...'
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: '🔄 In Progress'
                  },
                  value: 'in_progress'
                },
                {
                  text: {
                    type: 'plain_text', 
                    text: '✅ Completed'
                  },
                  value: 'completed'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '🚨 Blocked'
                  },
                  value: 'blocked'
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '⏳ Pending'
                  },
                  value: 'pending'
                }
              ]
            },
            label: {
              type: 'plain_text',
              text: 'New Status'
            },
            optional: true
          }
        ],
        submit: {
          type: 'plain_text',
          text: 'Update Task'
        }
      };

      await client.views.open({
        trigger_id: triggerId,
        view: modal
      });

    } catch (error) {
      console.error('Error opening task update modal:', error);
      throw error;
    }
  }

  async handleTaskCreation(body, view, client) {
    const metadata = JSON.parse(view.private_metadata);
    const values = view.state.values;

    try {
      // Find or create user based on Slack user ID
      const user = await this.findOrCreateUser(body.user.id, body.user.name);

      const taskData = {
        title: values.task_title.title_input.value,
        description: values.task_description?.description_input?.value || null,
        dueDate: values.due_date?.date_picker?.selected_date || null,
        priority: values.priority.priority_select.selected_option.value,
        slackChannelId: metadata.channelId,
        userId: user.id
      };

      console.log('Task creation data:', taskData);

      // Import TaskService to create the task
      const TaskService = require('./TaskService');
      const createdTask = await TaskService.createTask(taskData);

      console.log('Task created successfully:', createdTask.id);

      // Send confirmation message
      await client.chat.postMessage({
        channel: metadata.channelId,
        text: `✅ Task created: *${taskData.title}*\n📅 Due: ${taskData.dueDate || 'No due date'}\n🔗 Priority: ${taskData.priority}\n🆔 ID: ${createdTask.id}`
      });

    } catch (error) {
      console.error('Error creating task:', error);
      
      // Send error message
      await client.chat.postMessage({
        channel: metadata.channelId,
        text: `❌ Failed to create task: ${error.message}`
      });
    }
  }

  async handleTaskUpdate(body, view, client) {
    const values = view.state.values;

    try {
      const taskId = values.task_selection.selected_task.selected_option.value;
      const updateContent = values.update_content.content_input.value;
      const newStatus = values.status_update?.status_select?.selected_option?.value;

      const user = await this.findOrCreateUser(body.user.id, body.user.name);
      const TaskService = require('./TaskService');

      // Prepare update data
      const updateData = {
        updateContent
      };

      if (newStatus) {
        updateData.status = newStatus;
      }

      // Update the task
      const updatedTask = await TaskService.updateTask(taskId, updateData, user.id);

      console.log('Task updated successfully:', updatedTask.id);

      // Send success message (try to send to user DM)
      try {
        await client.chat.postMessage({
          channel: body.user.id,
          text: `✅ *Task Updated: ${updatedTask.title}*\n🔄 Status: ${updatedTask.status}\n📝 Update: ${updateContent}`
        });
      } catch (error) {
        console.log('Could not send DM, user might not have DMs enabled');
      }

    } catch (error) {
      console.error('Error updating task:', error);
      
      // Try to send error message
      try {
        await client.chat.postMessage({
          channel: body.user.id,
          text: `❌ Failed to update task: ${error.message}`
        });
      } catch (dmError) {
        console.log('Could not send error DM');
      }
    }
  }

  // Helper methods
  getNextFriday() {
    const today = new Date();
    const daysUntilFriday = 5 - today.getDay();
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (daysUntilFriday > 0 ? daysUntilFriday : daysUntilFriday + 7));
    return nextFriday.toISOString().split('T')[0];
  }

  async findOrCreateUser(slackUserId, slackUserName = 'Unknown User') {
    try {
      let user = await User.findOne({ where: { slackUserId } });
      
      if (!user) {
        // Create new user with Slack info
        user = await User.create({
          slackUserId,
          name: slackUserName
        });
        console.log(`Created new user: ${slackUserName} (${slackUserId})`);
      }
      
      return user;
    } catch (error) {
      console.error('Error finding/creating user:', error);
      throw error;
    }
  }

  getExpressMiddleware() {
    if (this.initialized) {
      // In Socket Mode, we don't use HTTP endpoints, so return a status middleware
      if (process.env.SLACK_APP_TOKEN) {
        return (req, res) => {
          res.json({ 
            message: 'Slack integration running via Socket Mode',
            status: 'connected'
          });
        };
      } else {
        // HTTP mode - return the receiver router
        return this.app.receiver.router;
      }
    } else {
      // Return a dummy middleware if Slack isn't configured
      return (req, res, next) => {
        res.status(503).json({ 
          error: 'Slack integration not configured',
          message: 'Please configure SLACK_BOT_TOKEN and SLACK_SIGNING_SECRET'
        });
      };
    }
  }
}

module.exports = new SlackService();