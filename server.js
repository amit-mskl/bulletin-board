const { App } = require('@slack/bolt');
require('dotenv').config();

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

// Handle the /weeklysummary slash command
app.command('/weeklysummary', async ({ command, ack, client, body }) => {
  await ack();

  try {
    // Open modal with date picker
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'weekly_summary_modal',
        title: {
          type: 'plain_text',
          text: 'Weekly Summary'
        },
        submit: {
          type: 'plain_text',
          text: 'Generate Summary'
        },
        close: {
          type: 'plain_text',
          text: 'Cancel'
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Select the date range for your weekly summary:'
            }
          },
          {
            type: 'input',
            block_id: 'start_date_block',
            element: {
              type: 'datepicker',
              action_id: 'start_date',
              placeholder: {
                type: 'plain_text',
                text: 'Select start date'
              }
            },
            label: {
              type: 'plain_text',
              text: 'Start Date'
            }
          },
          {
            type: 'input',
            block_id: 'end_date_block',
            element: {
              type: 'datepicker',
              action_id: 'end_date',
              placeholder: {
                type: 'plain_text',
                text: 'Select end date'
              }
            },
            label: {
              type: 'plain_text',
              text: 'End Date'
            }
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error opening modal:', error);
  }
});

// Handle modal submission
app.view('weekly_summary_modal', async ({ ack, body, view, client }) => {
  await ack();

  // Extract the selected dates
  const startDate = view.state.values.start_date_block.start_date.selected_date;
  const endDate = view.state.values.end_date_block.end_date.selected_date;
  const userId = body.user.id;

  try {
    // For now, just send a simple response
    await client.chat.postMessage({
      channel: userId, // Send DM to user
      text: `📊 *Weekly Summary Request*\n\n*Date Range:* ${startDate} to ${endDate}\n\n_Processing your conversations... (This is a placeholder for Phase 1)_\n\nNext steps:\n• Phase 2 will add actual conversation retrieval\n• Phase 3 will add AI-powered analysis`
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
});

// Start the app
(async () => {
  await app.start();
  console.log('⚡️ Slack bolt app is running in Socket Mode!');
})();