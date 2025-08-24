const Anthropic = require('@anthropic-ai/sdk');

class ClaudeService {
  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
      this.initialized = true;
      console.log('✅ Claude AI service initialized successfully');
    } else {
      console.log('⚠️  ANTHROPIC_API_KEY not configured. AI features disabled.');
      this.initialized = false;
    }
  }

  // Generate weekly summary for Friday meetings
  async generateWeeklySummary(tasks) {
    if (!this.initialized) {
      return this.fallbackSummary(tasks);
    }

    try {
      const prompt = this.buildSummaryPrompt(tasks);
      
      const message = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 800,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return this.parseSummaryResponse(message.content[0].text);
    } catch (error) {
      console.error('Claude API error:', error);
      return this.fallbackSummary(tasks);
    }
  }

  // Analyze tasks and detect celebrations
  async detectCelebrations(tasks) {
    if (!this.initialized) {
      return this.fallbackCelebrations(tasks);
    }

    try {
      const completedTasks = tasks.filter(t => t.status === 'completed');
      
      if (completedTasks.length === 0) {
        return { celebrations: [], mood: 'neutral', highlights: [] };
      }

      const prompt = `
      Analyze these completed tasks and identify achievements worth celebrating:
      
      ${completedTasks.map(t => `- ${t.user.name}: ${t.title} (${t.description || 'No description'})`).join('\n')}
      
      Return JSON format:
      {
        "celebrations": [
          {"user": "name", "achievement": "description", "emoji": "🎉"}
        ],
        "mood": "positive|neutral|concerned",
        "highlights": ["key wins this week"]
      }`;

      const message = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 400,
        temperature: 0.5,
        messages: [{ role: 'user', content: prompt }]
      });

      return JSON.parse(message.content[0].text);
    } catch (error) {
      console.error('Error detecting celebrations:', error);
      return this.fallbackCelebrations(tasks);
    }
  }

  // Generate contextual reminder message
  async generateReminder(user, task) {
    if (!this.initialized) {
      return `Hi ${user.name}, gentle reminder about "${task.title}" - how's it going?`;
    }

    try {
      const prompt = `
      Create a brief, encouraging reminder message for this task:
      
      User: ${user.name}
      Task: ${task.title}
      Due: ${task.dueDate ? new Date(task.dueDate).toDateString() : 'No due date'}
      Status: ${task.status}
      Priority: ${task.priority}
      
      Make it friendly, specific, and encouraging. Max 50 words.`;

      const message = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 100,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      });

      return message.content[0].text.trim();
    } catch (error) {
      console.error('Error generating reminder:', error);
      return `Hi ${user.name}, gentle reminder about "${task.title}" - how's it going?`;
    }
  }

  // Analyze team patterns and suggest improvements
  async analyzeTeamPatterns(weeklyData) {
    if (!this.initialized) {
      return this.fallbackPatterns(weeklyData);
    }

    try {
      const prompt = `
      Analyze this team's weekly performance and provide insights:
      
      Total Tasks: ${weeklyData.totalTasks}
      Completed: ${weeklyData.completed}
      In Progress: ${weeklyData.inProgress}
      Blocked: ${weeklyData.blocked}
      Overdue: ${weeklyData.overdue}
      
      Provide 2-3 actionable insights to help the team improve.
      Focus on productivity, collaboration, and process improvements.
      Keep it positive and constructive.`;

      const message = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }]
      });

      return message.content[0].text;
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      return this.fallbackPatterns(weeklyData);
    }
  }

  // Helper methods
  buildSummaryPrompt(tasks) {
    const tasksByStatus = {
      completed: tasks.filter(t => t.status === 'completed'),
      inProgress: tasks.filter(t => t.status === 'in_progress'),
      blocked: tasks.filter(t => t.status === 'blocked'),
      pending: tasks.filter(t => t.status === 'pending')
    };

    return `
    Create a brief, engaging summary for a Friday team meeting based on these tasks:
    
    COMPLETED TASKS (${tasksByStatus.completed.length}):
    ${tasksByStatus.completed.map(t => `- ${t.user.name}: ${t.title}`).join('\n')}
    
    IN PROGRESS (${tasksByStatus.inProgress.length}):
    ${tasksByStatus.inProgress.map(t => `- ${t.user.name}: ${t.title}`).join('\n')}
    
    BLOCKED TASKS (${tasksByStatus.blocked.length}):
    ${tasksByStatus.blocked.map(t => `- ${t.user.name}: ${t.title}`).join('\n')}
    
    Format as:
    🎉 CELEBRATIONS: [wins and achievements]
    ⚠️  FOCUS AREAS: [challenges that need attention]
    📊 INSIGHTS: [team patterns and productivity notes]
    
    Keep it concise, positive, and actionable. Max 300 words.`;
  }

  parseSummaryResponse(response) {
    try {
      // Simple parsing - split by emoji headers
      const sections = response.split(/[🎉⚠️📊]/);
      
      return {
        celebrations: this.extractBulletPoints(sections[1] || ''),
        focusAreas: this.extractBulletPoints(sections[2] || ''),
        insights: this.extractBulletPoints(sections[3] || ''),
        fullText: response
      };
    } catch (error) {
      return {
        celebrations: [],
        focusAreas: [],
        insights: [],
        fullText: response
      };
    }
  }

  extractBulletPoints(text) {
    if (!text) return [];
    
    return text.split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.trim().substring(1).trim())
      .filter(line => line.length > 0);
  }

  // Fallback methods when Claude is not available
  fallbackSummary(tasks) {
    const completed = tasks.filter(t => t.status === 'completed');
    const blocked = tasks.filter(t => t.status === 'blocked');
    
    return {
      celebrations: completed.map(t => `${t.user.name} completed: ${t.title}`),
      focusAreas: blocked.map(t => `${t.user.name} blocked on: ${t.title}`),
      insights: [`${tasks.length} total tasks tracked this week`],
      fullText: `Weekly Summary: ${completed.length} completed, ${blocked.length} blocked, ${tasks.length} total tasks.`
    };
  }

  fallbackCelebrations(tasks) {
    const completed = tasks.filter(t => t.status === 'completed');
    
    return {
      celebrations: completed.map(t => ({
        user: t.user.name,
        achievement: `Completed: ${t.title}`,
        emoji: '🎉'
      })),
      mood: completed.length > 0 ? 'positive' : 'neutral',
      highlights: completed.map(t => `${t.user.name} finished ${t.title}`)
    };
  }

  fallbackPatterns(weeklyData) {
    const completionRate = weeklyData.totalTasks > 0 ? 
      Math.round((weeklyData.completed / weeklyData.totalTasks) * 100) : 0;
    
    return `Team completed ${completionRate}% of tasks this week. ${weeklyData.blocked > 0 ? `${weeklyData.blocked} tasks are currently blocked and may need attention.` : 'Good progress overall!'}`;
  }
}

module.exports = new ClaudeService();