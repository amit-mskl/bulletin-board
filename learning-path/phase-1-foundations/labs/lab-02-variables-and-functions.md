# Lab 2: Variables and Functions

**Duration:** 60-75 minutes  
**Prerequisites:** Lab 1 completed, basic JavaScript understanding  
**Difficulty:** Beginner to Intermediate

## Lab Overview

This lab deepens your understanding of variables and functions by building a personal task management system. You'll learn about different variable types, scope, advanced function concepts, and data organization techniques that are essential for larger applications.

## Learning Goals

- Master different variable declaration methods (let, const, var)
- Understand function scope and parameter handling
- Work with arrays and objects to organize data
- Build functions that work together to solve complex problems
- Practice debugging and code organization

## Part 1: Advanced Variable Concepts (20 minutes)

### Step 1: Create Your Lab Environment
```bash
# Navigate to your development folder
cd ~/development

# Create lab directory
mkdir lab-02-variables-functions
cd lab-02-variables-functions

# Open in VS Code
code .
```

Create a new file: `task-manager.js`

### Step 2: Variable Declaration Best Practices
```javascript
// Lab 2: Task Management System
// Understanding variable declarations

// const - for values that won't change
const APP_NAME = "My Task Manager";
const VERSION = "1.0.0";

// let - for values that will change
let currentUser = "Guest";
let taskCount = 0;

// Arrays and Objects
let tasks = []; // Empty array to store tasks
let userSettings = {
    theme: "light",
    notifications: true,
    language: "english"
};

console.log("=== " + APP_NAME + " v" + VERSION + " ===");
console.log("Current user: " + currentUser);
console.log("Tasks loaded: " + taskCount);
```

### Step 3: Understanding Scope
```javascript
// Global variables (available everywhere)
let globalMessage = "I'm available everywhere!";

function demonstrateScope() {
    // Local variables (only available inside this function)
    let localMessage = "I only exist in this function";
    
    console.log("Inside function:");
    console.log("- Global: " + globalMessage); // Works
    console.log("- Local: " + localMessage);   // Works
    
    // Modifying global variable from inside function
    currentUser = "Alex";
}

demonstrateScope();
console.log("Outside function:");
console.log("- Global: " + globalMessage); // Works
console.log("- Current user: " + currentUser); // Changed!
// console.log("- Local: " + localMessage); // Would cause error!
```

## Part 2: Building a Task System (25 minutes)

### Step 1: Task Creation Functions
```javascript
// Task object template
function createTask(title, priority = "medium", dueDate = "no date") {
    let task = {
        id: generateTaskId(),
        title: title,
        priority: priority,
        dueDate: dueDate,
        completed: false,
        createdAt: new Date().toLocaleDateString()
    };
    
    return task;
}

// Helper function to generate unique IDs
function generateTaskId() {
    return "task_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
}

// Function to add task to our list
function addTask(title, priority, dueDate) {
    let newTask = createTask(title, priority, dueDate);
    tasks.push(newTask);
    taskCount++;
    
    console.log("✅ Task added: " + title);
    return newTask;
}

// Test the functions
console.log("\n=== Creating Tasks ===");
addTask("Learn JavaScript fundamentals", "high", "2024-02-01");
addTask("Complete Lab 2", "high", "today");
addTask("Read programming book", "low");
addTask("Practice coding", "medium", "2024-02-15");

console.log("Total tasks: " + taskCount);
```

### Step 2: Task Display Functions
```javascript
// Function to display all tasks
function displayAllTasks() {
    console.log("\n=== My Tasks ===");
    
    if (tasks.length === 0) {
        console.log("No tasks yet. Add some!");
        return;
    }
    
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let status = task.completed ? "✅" : "⏳";
        let priorityIcon = getPriorityIcon(task.priority);
        
        console.log(
            status + " " + 
            priorityIcon + " " + 
            task.title + 
            " (Due: " + task.dueDate + ")"
        );
    }
}

// Helper function for priority icons
function getPriorityIcon(priority) {
    if (priority === "high") return "🔥";
    if (priority === "medium") return "⚡";
    if (priority === "low") return "💤";
    return "❓"; // Unknown priority
}

// Function to display tasks by priority
function displayTasksByPriority(priorityLevel) {
    console.log("\n=== " + priorityLevel.toUpperCase() + " Priority Tasks ===");
    
    let found = false;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].priority === priorityLevel) {
            let task = tasks[i];
            let status = task.completed ? "✅" : "⏳";
            console.log(status + " " + task.title + " (Due: " + task.dueDate + ")");
            found = true;
        }
    }
    
    if (!found) {
        console.log("No " + priorityLevel + " priority tasks found.");
    }
}

// Test the display functions
displayAllTasks();
displayTasksByPriority("high");
displayTasksByPriority("medium");
displayTasksByPriority("low");
```

### Step 3: Task Management Functions
```javascript
// Function to mark task as completed
function completeTask(taskTitle) {
    let found = false;
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === taskTitle) {
            tasks[i].completed = true;
            console.log("🎉 Completed: " + taskTitle);
            found = true;
            break;
        }
    }
    
    if (!found) {
        console.log("❌ Task not found: " + taskTitle);
    }
}

// Function to delete a task
function deleteTask(taskTitle) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === taskTitle) {
            tasks.splice(i, 1); // Remove task from array
            taskCount--;
            console.log("🗑️ Deleted: " + taskTitle);
            return true;
        }
    }
    
    console.log("❌ Task not found: " + taskTitle);
    return false;
}

// Function to get task statistics
function getTaskStats() {
    let completed = 0;
    let highPriority = 0;
    let overdue = 0;
    
    let today = new Date().toLocaleDateString();
    
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        
        if (task.completed) completed++;
        if (task.priority === "high") highPriority++;
        if (task.dueDate === "today" || task.dueDate < today) overdue++;
    }
    
    return {
        total: tasks.length,
        completed: completed,
        remaining: tasks.length - completed,
        highPriority: highPriority,
        overdue: overdue
    };
}

// Test management functions
console.log("\n=== Task Management ===");
completeTask("Complete Lab 2");
deleteTask("Read programming book");

let stats = getTaskStats();
console.log("\n=== Task Statistics ===");
console.log("Total tasks: " + stats.total);
console.log("Completed: " + stats.completed);
console.log("Remaining: " + stats.remaining);
console.log("High priority: " + stats.highPriority);
console.log("Overdue: " + stats.overdue);

// Show updated task list
displayAllTasks();
```

## Part 3: Advanced Function Concepts (15 minutes)

### Step 1: Functions with Multiple Return Types
```javascript
// Function that returns different types based on input
function findTask(searchTerm) {
    // Search by exact title
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === searchTerm) {
            return tasks[i]; // Return the task object
        }
    }
    
    // Search by partial title match
    let matches = [];
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
            matches.push(tasks[i]);
        }
    }
    
    if (matches.length > 0) {
        return matches; // Return array of matches
    }
    
    return null; // Return null if nothing found
}

// Test different search scenarios
console.log("\n=== Task Search ===");
let exactMatch = findTask("Learn JavaScript fundamentals");
console.log("Exact match:", exactMatch ? exactMatch.title : "Not found");

let partialMatches = findTask("learn");
if (partialMatches && Array.isArray(partialMatches)) {
    console.log("Partial matches found: " + partialMatches.length);
    for (let i = 0; i < partialMatches.length; i++) {
        console.log("- " + partialMatches[i].title);
    }
}

let noMatch = findTask("nonexistent task");
console.log("No match result:", noMatch);
```

### Step 2: Functions as Parameters (Higher-Order Functions)
```javascript
// Function that takes another function as a parameter
function processAllTasks(processingFunction) {
    console.log("\n=== Processing All Tasks ===");
    
    for (let i = 0; i < tasks.length; i++) {
        processingFunction(tasks[i], i);
    }
}

// Different processing functions
function printTaskSummary(task, index) {
    console.log((index + 1) + ". " + task.title + " [" + task.priority + "]");
}

function printTaskDetails(task, index) {
    console.log("Task #" + (index + 1));
    console.log("  Title: " + task.title);
    console.log("  Priority: " + task.priority);
    console.log("  Due: " + task.dueDate);
    console.log("  Status: " + (task.completed ? "Completed" : "Pending"));
    console.log("  Created: " + task.createdAt);
    console.log("---");
}

// Test higher-order functions
processAllTasks(printTaskSummary);
processAllTasks(printTaskDetails);
```

## Part 4: Code Organization and Best Practices (10 minutes)

### Step 1: Organizing Code into Modules
```javascript
// Task Manager Module - organized code structure
const TaskManager = {
    // Data
    tasks: [],
    currentUser: "Guest",
    
    // Core functions
    addTask: function(title, priority = "medium", dueDate = "no date") {
        let task = {
            id: Date.now(),
            title: title,
            priority: priority,
            dueDate: dueDate,
            completed: false,
            createdAt: new Date().toLocaleDateString()
        };
        
        this.tasks.push(task);
        console.log("✅ Added: " + title);
        return task;
    },
    
    completeTask: function(title) {
        let task = this.tasks.find(t => t.title === title);
        if (task) {
            task.completed = true;
            console.log("🎉 Completed: " + title);
            return true;
        }
        console.log("❌ Task not found: " + title);
        return false;
    },
    
    getStats: function() {
        let completed = this.tasks.filter(t => t.completed).length;
        return {
            total: this.tasks.length,
            completed: completed,
            remaining: this.tasks.length - completed
        };
    },
    
    displayAll: function() {
        console.log("\n=== Task Manager Summary ===");
        let stats = this.getStats();
        console.log("User: " + this.currentUser);
        console.log("Total: " + stats.total + " | Completed: " + stats.completed + " | Remaining: " + stats.remaining);
        
        this.tasks.forEach((task, index) => {
            let status = task.completed ? "✅" : "⏳";
            console.log((index + 1) + ". " + status + " " + task.title + " [" + task.priority + "]");
        });
    }
};

// Test the organized version
console.log("\n=== Testing Organized Code ===");
TaskManager.currentUser = "Alice";
TaskManager.addTask("Review code structure", "high", "tomorrow");
TaskManager.addTask("Practice functions", "medium", "next week");
TaskManager.completeTask("Review code structure");
TaskManager.displayAll();
```

## Part 5: Lab Challenge - Personal Productivity System (15 minutes)

Build a comprehensive productivity tracking system:

### Challenge Requirements:
1. **User Management**: Functions to switch between different users
2. **Category System**: Organize tasks by categories (work, personal, learning)
3. **Time Tracking**: Add estimated time and actual time spent
4. **Productivity Calculator**: Calculate productivity metrics
5. **Task Filtering**: Multiple ways to filter and sort tasks

### Starter Template:
```javascript
// Personal Productivity System Challenge

const ProductivityTracker = {
    users: {},
    currentUser: null,
    
    // User management
    createUser: function(username) {
        // Your code here
    },
    
    switchUser: function(username) {
        // Your code here
    },
    
    // Enhanced task management
    addTaskWithCategory: function(title, category, estimatedTime, priority = "medium") {
        // Your code here
    },
    
    startTimer: function(taskTitle) {
        // Your code here
    },
    
    stopTimer: function(taskTitle) {
        // Your code here
    },
    
    // Analytics
    getProductivityReport: function() {
        // Calculate and return productivity metrics
        // Your code here
    },
    
    getTasksByCategory: function(category) {
        // Your code here
    },
    
    // Display functions
    displayProductivityDashboard: function() {
        // Show comprehensive overview
        // Your code here
    }
};

// Test your system
console.log("=== Productivity System Test ===");
// Add your test code here
```

## Expected Outcomes

After completing this lab, you should be able to:
- ✅ Use const, let appropriately and understand scope
- ✅ Create functions with default parameters and multiple return types
- ✅ Work with arrays and objects to organize complex data
- ✅ Build functions that work together to solve larger problems
- ✅ Understand and use higher-order functions
- ✅ Organize code into logical modules and structures
- ✅ Debug complex multi-function programs

## Common Debugging Scenarios

### Issue: "Cannot read property of undefined"
```javascript
// Problem: Trying to access property of undefined object
let task = tasks[10]; // Array might not have 10 items
console.log(task.title); // Error if task is undefined

// Solution: Check if object exists first
let task = tasks[10];
if (task) {
    console.log(task.title);
} else {
    console.log("Task not found");
}
```

### Issue: Function scope problems
```javascript
// Problem: Variable not accessible
function addTask() {
    let taskId = generateId(); // Local variable
}

console.log(taskId); // Error: taskId not defined

// Solution: Return value or use proper scope
function addTask() {
    let taskId = generateId();
    return taskId; // Return the value
}

let newTaskId = addTask(); // Capture returned value
console.log(newTaskId); // Now it works
```

## Next Steps

Excellent work! You've built a functional task management system with advanced JavaScript concepts. 

**Before Lab 3:**
1. Experiment with the code - add your own features
2. Try the productivity tracker challenge
3. Practice debugging by intentionally breaking and fixing code

**Coming up in Lab 3:** We'll learn about web requests and start connecting our JavaScript to web services, setting up for our bulletin board project!

## Quick Reference

### Variable Declarations
- `const` - Cannot be reassigned, use for constants
- `let` - Can be reassigned, use for changing values
- `var` - Older syntax, avoid in new code

### Function Patterns
```javascript
// Basic function
function name(parameters) { return value; }

// Function with defaults
function greet(name = "Friend") { return "Hello " + name; }

// Anonymous function
let calculate = function(a, b) { return a + b; };

// Arrow function (modern syntax)
let multiply = (a, b) => a * b;
```

Keep your code organized and test frequently - great job building these foundations!