# Assessment B: Applied Programming & Web Integration

**Duration:** 120 minutes  
**Total Points:** 150 points  
**Focus:** Real-world application, web APIs, integration, and project development

**Instructions:**
- This is a practical, application-focused assessment
- You may use browser developer tools and test your code
- Focus on working solutions rather than perfect syntax
- Time management: Part I (20 min), Part II (45 min), Part III (40 min), Part IV (15 min)
- Partial credit available for logical approaches even if incomplete

---

## Part I: Practical Problem Analysis (20 minutes, 25 points)

### 1. Situational Analysis - Team Dashboard Requirements (8 points)

Your company needs a team dashboard that displays:
- Current team members and their status (online/offline/busy)
- Today's scheduled meetings
- Recent project updates
- Weather for the office location

**Analyze and Plan:**

a) **Data Sources (2 points):** What types of data will you need and where might you get them?
```
Team status: 
Meeting data: 
Project updates: 
Weather data: 
```

b) **API Strategy (3 points):** For each data source, would you use GET, POST, PUT, or DELETE? Explain why:
```
Team status: _______ because: 
Meeting data: _______ because: 
Project updates: _______ because: 
Weather data: _______ because: 
```

c) **Error Handling (3 points):** What could go wrong with each data source and how would you handle it?
```
Potential issues and solutions:
1. 
2. 
3. 
```

### 2. Code Architecture Decision (9 points)

You need to choose between these three approaches for organizing your dashboard code:

**Option A: Functional Approach**
```javascript
let dashboardData = {};

function fetchTeamData() { /* ... */ }
function fetchWeatherData() { /* ... */ }
function updateDisplay() { /* ... */ }
function handleErrors(error) { /* ... */ }
```

**Option B: Object-Oriented Approach**
```javascript
class Dashboard {
    constructor() { this.data = {}; }
    fetchTeamData() { /* ... */ }
    fetchWeatherData() { /* ... */ }
    updateDisplay() { /* ... */ }
    handleErrors(error) { /* ... */ }
}
```

**Option C: Module Approach**
```javascript
const Dashboard = {
    data: {},
    api: {
        fetchTeam: function() { /* ... */ },
        fetchWeather: function() { /* ... */ }
    },
    ui: {
        update: function() { /* ... */ },
        showError: function() { /* ... */ }
    }
};
```

**Your Analysis:**
a) **Best choice and why (3 points):** 

b) **Advantages of your chosen approach (3 points):** 

c) **When might you choose one of the other approaches (3 points):** 

### 3. Integration Challenge Planning (8 points)

You discover that the team status API returns data in this format:
```javascript
{
    "team_members": [
        {"name": "Alice", "status": "online", "last_seen": "2024-01-15T10:30:00Z"},
        {"name": "Bob", "status": "offline", "last_seen": "2024-01-15T09:15:00Z"}
    ]
}
```

But your dashboard expects this format:
```javascript
[
    {id: 1, displayName: "Alice", isOnline: true, lastActive: "10:30 AM"},
    {id: 2, displayName: "Bob", isOnline: false, lastActive: "9:15 AM"}
]
```

**Design a solution (8 points):**
Write a function that converts the API format to your expected format. Include error handling for missing or invalid data.

```javascript
function transformTeamData(apiResponse) {
    // Your solution here




}
```

---

## Part II: Building a Complete Feature (45 minutes, 60 points)

### 4. Project: Personal Task Manager with Web Integration (60 points)

Build a complete task management system that integrates with web APIs. This should be a working web page with HTML, CSS, and JavaScript.

#### Requirements Overview:
- **Core Functionality (20 points):** Add, edit, complete, and delete tasks
- **Data Persistence (15 points):** Save/load tasks using localStorage
- **API Integration (15 points):** Fetch motivational quotes or productivity tips
- **User Experience (10 points):** Clean interface, loading states, error messages

#### Starter HTML Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager Pro</title>
    <style>
        /* Add your CSS styling here */
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .task-item { border: 1px solid #ddd; padding: 10px; margin: 5px 0; border-radius: 5px; }
        .completed { text-decoration: line-through; opacity: 0.6; }
        .error { color: red; }
        .success { color: green; }
        .loading { color: #666; font-style: italic; }
    </style>
</head>
<body>
    <div id="app">
        <h1>Task Manager Pro</h1>
        
        <!-- Task Input Section -->
        <div id="task-input">
            <input type="text" id="new-task-title" placeholder="Task title">
            <select id="task-priority">
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
            </select>
            <button onclick="addTask()">Add Task</button>
        </div>
        
        <!-- Tasks Display -->
        <div id="tasks-container">
            <!-- Tasks will be displayed here -->
        </div>
        
        <!-- Motivation Section -->
        <div id="motivation-section">
            <h2>Daily Motivation</h2>
            <button onclick="fetchMotivation()">Get Motivation</button>
            <div id="motivation-display"></div>
        </div>
        
        <!-- Statistics -->
        <div id="stats-section">
            <h2>Statistics</h2>
            <div id="task-stats"></div>
        </div>
    </div>
    
    <script>
        // Your JavaScript code goes here
    </script>
</body>
</html>
```

#### Implementation Guidelines:

**A) Core Task Management (20 points)**
Implement these functions:
```javascript
// Your task data structure
let tasks = [];
let taskIdCounter = 1;

function addTask() {
    // Get input values
    // Create task object with id, title, priority, completed, createdAt
    // Add to tasks array
    // Update display
    // Clear input fields
}

function toggleTask(taskId) {
    // Toggle completed status
    // Update display
    // Save to localStorage
}

function deleteTask(taskId) {
    // Remove from tasks array
    // Update display  
    // Save to localStorage
}

function editTask(taskId, newTitle) {
    // Find task and update title
    // Update display
    // Save to localStorage
}

function displayTasks() {
    // Render all tasks in the container
    // Include complete/delete/edit buttons
    // Show different styles for completed tasks
}
```

**B) Data Persistence (15 points)**
```javascript
function saveTasks() {
    // Save tasks array to localStorage
}

function loadTasks() {
    // Load tasks from localStorage on page startup
    // Handle case where no saved data exists
}

function exportTasks() {
    // BONUS: Allow user to download tasks as JSON file
}
```

**C) API Integration (15 points)**
Integrate with a motivational quotes API:
```javascript
async function fetchMotivation() {
    // Show loading state
    // Fetch from API (try: https://api.quotable.io/random)
    // Display quote and author
    // Handle errors gracefully
    // You can use any free quotes API or create mock data
}

async function fetchProductivityTip() {
    // BONUS: Fetch productivity tips from another source
}
```

**D) User Experience & Statistics (10 points)**
```javascript
function updateStatistics() {
    // Calculate and display:
    // - Total tasks
    // - Completed tasks
    // - Completion percentage
    // - Tasks by priority
}

function showNotification(message, type) {
    // Display temporary success/error messages
}

function addLoadingState(elementId) {
    // Show loading spinner or message
}

function removeLoadingState(elementId) {
    // Hide loading state
}
```

#### Your Complete Solution:
Write your complete HTML file with all functionality implemented:

```html
<!-- Paste your complete solution here -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager Pro</title>
    <style>
        /* Your CSS here */
        
        
        
    </style>
</head>
<body>
    <!-- Your HTML structure here -->
    
    
    
    <script>
        // Your complete JavaScript solution here
        
        
        
        
        
        
        
        
        
        
        
        
        
    </script>
</body>
</html>
```

---

## Part III: Advanced Integration & Problem Solving (40 minutes, 50 points)

### 5. Multi-API Dashboard Challenge (25 points)

Create a function that fetches data from multiple APIs and combines them into a unified dashboard. Handle the complexity of different response times and potential failures.

**Scenario:** You need to build a developer dashboard that shows:
- Current weather (OpenWeatherMap API or mock)
- Latest GitHub repositories trending (GitHub API or mock)
- Random programming joke (Jokes API)
- Current time in different timezones

```javascript
class DeveloperDashboard {
    constructor() {
        this.data = {
            weather: null,
            repositories: [],
            joke: null,
            times: {},
            lastUpdated: null
        };
    }
    
    async fetchWeatherData(city = "San Francisco") {
        // Implement weather fetching
        // Handle API errors
        // Return standardized weather object
    }
    
    async fetchTrendingRepos(language = "javascript") {
        // Fetch trending repositories
        // Handle API rate limits
        // Return simplified repo data
    }
    
    async fetchProgrammingJoke() {
        // Get a random programming joke
        // Handle API failures with fallback jokes
    }
    
    async fetchWorldTimes() {
        // Get current time in different zones
        // You can use Date object or time API
    }
    
    async loadDashboard() {
        // Orchestrate all API calls
        // Handle partial failures (some APIs work, others don't)
        // Update data property
        // Return summary of what loaded successfully
    }
    
    generateHTML() {
        // Create HTML representation of all dashboard data
        // Handle missing data gracefully
        // Return formatted HTML string
    }
    
    handleApiError(apiName, error) {
        // Centralized error handling
        // Log errors appropriately
        // Return fallback data when possible
    }
}

// Implementation example:
const dashboard = new DeveloperDashboard();
dashboard.loadDashboard().then(result => {
    console.log('Dashboard loaded:', result);
    document.getElementById('dashboard').innerHTML = dashboard.generateHTML();
});
```

**Your Implementation (25 points):**
```javascript
// Complete the DeveloperDashboard class above
// Focus on error handling, data integration, and user experience




```

### 6. Real-World Debugging Scenario (15 points)

A junior developer wrote this code for a team status page, but users are reporting issues. Identify all problems and provide fixed code:

```javascript
// BUGGY CODE - DO NOT USE AS-IS
async function loadTeamStatus() {
    let statusDiv = document.getElementById('team-status');
    statusDiv.innerHTML = 'Loading team status...';
    
    let response = fetch('https://api.company.com/team/status');
    let data = response.json();
    
    let html = '<h2>Team Status</h2>';
    for (let i = 0; i < data.members.length; i++) {
        let member = data.members[i];
        let statusColor = member.status === 'online' ? 'green' : 'red';
        html += '<div style="color: ' + statusColor + '">';
        html += member.name + ' - ' + member.status;
        html += '</div>';
    }
    
    statusDiv.innerHTML = html;
    
    // Auto-refresh every 5 seconds
    setTimeout(loadTeamStatus, 5000);
}

function updateMemberStatus(memberId, newStatus) {
    fetch('https://api.company.com/team/member/' + memberId, {
        method: 'POST',
        body: JSON.stringify({status: newStatus})
    });
    
    loadTeamStatus();
}

// Initialize when page loads
loadTeamStatus();
```

**Problems identified:**
```
1. 
2. 
3. 
4. 
5. 
6. 
```

**Your corrected code:**
```javascript




```

### 7. Performance & Optimization Challenge (10 points)

Analyze this code and suggest optimizations for better performance and user experience:

```javascript
// Current implementation
function searchTasks(query) {
    let results = [];
    let allTasks = getTasks(); // Fetches from server every time
    
    for (let task of allTasks) {
        if (task.title.includes(query) || 
            task.description.includes(query) ||
            task.assignee.includes(query)) {
            results.push(task);
        }
    }
    
    displaySearchResults(results);
}

// Called on every keystroke
document.getElementById('search-input').addEventListener('input', function(e) {
    searchTasks(e.target.value);
});
```

**Your optimizations and reasoning:**
```
1. Issue: 
   Solution: 

2. Issue: 
   Solution: 

3. Issue: 
   Solution: 
```

**Optimized code:**
```javascript




```

---

## Part IV: Creative Problem Solving & Architecture (15 minutes, 15 points)

### 8. System Design Challenge (15 points)

**Scenario:** Your team wants to build a collaborative bulletin board system (like the one in our course project). Design the high-level architecture and identify the key components.

**Requirements:**
- Multiple users can post updates
- AI summarizes weekly activities  
- Integrates with Slack for notifications
- Stores data persistently
- Real-time updates when possible

**A) Architecture Diagram (5 points)**
Draw or describe the system components and how they connect:
```
Frontend (Client):


Backend (Server):


External Services:


Data Storage:
```

**B) API Design (5 points)**
Design the key API endpoints your system would need:
```
POST /api/posts - 
GET /api/posts - 
PUT /api/posts/:id - 
DELETE /api/posts/:id - 
GET /api/summary/weekly - 
POST /api/slack/notify - 
```

**C) Technology Choices (5 points)**
Justify your technology stack choices:
```
Frontend Framework: _________ because: 

Backend Framework: _________ because: 

Database: _________ because: 

AI Service: _________ because: 

Deployment: _________ because: 
```

---

## Bonus Challenges (Optional - up to 20 extra credit points)

### Bonus A: Code Golf (5 points)
Write the shortest possible JavaScript function that takes an array of numbers and returns the sum of only the even numbers.

**Your solution:**
```javascript
// Shortest function possible
const sumEvens = 
```

### Bonus B: Creative Feature (10 points)
Design one innovative feature for the task management system that would make it stand out. Describe the feature and provide a code outline.

**Feature description:**


**Implementation outline:**
```javascript




```

### Bonus C: Integration Innovation (5 points)
Propose how you would integrate the task manager with three different external services (not mentioned in the assessment). Explain the value each integration provides.

**Your proposals:**
```
1. Service: _________ Integration: _________ Value: 

2. Service: _________ Integration: _________ Value: 

3. Service: _________ Integration: _________ Value: 
```

---

## Submission Guidelines

### Required Deliverables:
- [ ] All written responses are complete and clearly explained
- [ ] Code solutions are properly formatted and commented
- [ ] Part II includes a working HTML file (test it in your browser)
- [ ] Reasoning is provided for design decisions
- [ ] Solutions demonstrate practical understanding, not just theoretical knowledge

### Evaluation Criteria:

**Excellent (A: 135-150 points)**
- Solutions work correctly and handle edge cases
- Code is well-organized and follows best practices
- Demonstrates creative problem-solving and optimization thinking
- Shows deep understanding of integration concepts

**Good (B: 120-134 points)**
- Most solutions work with minor issues
- Good grasp of concepts with solid implementation
- Some consideration of best practices and error handling

**Satisfactory (C: 105-119 points)**
- Basic functionality works but may lack robustness
- Understands core concepts but struggles with complex integration
- Limited error handling and optimization

**Needs Improvement (D: 90-104 points)**
- Partial solutions with significant gaps
- Basic understanding but difficulty applying concepts
- Minimal consideration of real-world requirements

**Unsatisfactory (F: Below 90 points)**
- Incomplete or non-functional solutions
- Limited understanding of fundamental concepts

### Time Management Tips:
- **Part I (20 min):** Quick analysis, don't overthink
- **Part II (45 min):** Focus on working code, perfect later
- **Part III (40 min):** Prioritize partial solutions over incomplete perfection
- **Part IV (15 min):** High-level thinking, bullet points acceptable

**Total Points: _____ / 150**  
**Bonus Points: _____ / 20**  
**Final Score: _____ / 170**

Good luck! Remember: this assessment tests your ability to build real applications, not memorize syntax. Focus on problem-solving and practical implementation.