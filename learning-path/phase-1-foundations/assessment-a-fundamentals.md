# Assessment A: Programming Fundamentals & Core Concepts

**Duration:** 60 minutes  
**Total Points:** 100 points  
**Focus:** JavaScript basics, variables, functions, and foundational debugging

**Instructions:**
- Read all questions carefully before starting
- Show your work and reasoning for partial credit
- You may use the browser console for testing small code snippets
- Manage your time: Part I (15 min), Part II (25 min), Part III (20 min)

---

## Part I: Quick Knowledge Check (15 minutes, 20 points)

### 1. Remembering - Terminology (2 points)
Match each term with its correct definition:
```
A. Variable    1. A reusable block of code that performs a task
B. Function    2. A container that stores data values  
C. Parameter   3. Input values that functions can accept
D. Return      4. The output value a function gives back
```

**Your answers:** A-___, B-___, C-___, D-___

### 2. Understanding - Concept Explanation (3 points)
Explain the difference between `let`, `const`, and `var` in JavaScript. When would you use each one?

**Your answer:**
```
let: 

const: 

var: 

```

### 3. Remembering - Syntax (2 points)
Circle all the CORRECT ways to declare a function in JavaScript:
```javascript
a) function greet() { return "Hello"; }
b) let greet = function() { return "Hello"; }  
c) function greet[] { return "Hello"; }
d) const greet = () => "Hello";
e) greet function() { return "Hello"; }
```

**Your answers:** _______________

### 4. Understanding - Code Reading (3 points)
What will this code output? Explain your reasoning:
```javascript
let x = 5;
let y = 10;

function calculate(a, b) {
    let result = a * 2 + b;
    return result;
}

console.log(calculate(x, y));
console.log(calculate(3, 4));
```

**Output:**
```
Line 1: 
Line 2: 
```

**Reasoning:**


### 5. Applying - Variable Scope (4 points)
Identify the error in this code and explain how to fix it:
```javascript
function createMessage() {
    let greeting = "Hello";
    let name = "World";
}

console.log(greeting + " " + name);
```

**Error identified:**


**Corrected code:**
```javascript

```

### 6. Understanding - Data Types (6 points)
For each value, identify its data type and explain when you might use it:
```javascript
a) "JavaScript is fun"
b) 42
c) true
d) ["apple", "banana", "orange"]
e) { name: "Alice", age: 25 }
f) null
```

**Your answers:**
```
a) Type: _______ Use case: 
b) Type: _______ Use case: 
c) Type: _______ Use case: 
d) Type: _______ Use case: 
e) Type: _______ Use case: 
f) Type: _______ Use case: 
```

---

## Part II: Problem-Solving & Application (25 minutes, 40 points)

### 7. Applying - Complete the Code (8 points)
Complete this function that should return a personalized greeting message:
```javascript
function createGreeting(name, timeOfDay) {
    // Your code here
    // Should return: "Good morning, Alice!" or "Good evening, Bob!" etc.
    // Handle edge cases where name might be empty
}

// Test cases:
console.log(createGreeting("Alice", "morning")); // "Good morning, Alice!"
console.log(createGreeting("", "afternoon"));    // "Good afternoon, Friend!"
```

**Your solution:**
```javascript
function createGreeting(name, timeOfDay) {



}
```

### 8. Analyzing - Debugging Challenge (10 points)
This code has multiple errors. Find all errors and provide the corrected version:
```javascript
function calculateAge(birthYear currentYear) {
    let age = currentYear - birthYear
    
    if age < 0 {
        return "Invalid birth year";
    } else if (age >= 18) {
        return "Adult: " + age + " years old"
    } else {
        return "Minor: " + age + " years old"
    }

// Test the function
console.log(calculateAge(1995, 2024);
console.log(calculateAge(2030, 2024));
```

**Errors found:**
```
1. 
2. 
3. 
4. 
```

**Corrected code:**
```javascript




```

### 9. Creating - Build a Solution (12 points)
Write a function called `analyzeNumbers` that takes an array of numbers and returns an object with:
- `total`: sum of all numbers
- `average`: average of all numbers  
- `highest`: largest number
- `lowest`: smallest number
- `count`: how many numbers were provided

```javascript
function analyzeNumbers(numbers) {
    // Your code here
}

// Example usage:
let result = analyzeNumbers([5, 2, 8, 1, 9]);
console.log(result);
// Should output: { total: 25, average: 5, highest: 9, lowest: 1, count: 5 }
```

**Your solution:**
```javascript
function analyzeNumbers(numbers) {








}
```

### 10. Evaluating - Best Practices (10 points)
Review these three approaches to the same problem. Rank them from best (1) to worst (3) and explain your reasoning:

**Version A:**
```javascript
function checkNumber(n) {
    if (n > 0) {
        return "positive";
    } else if (n < 0) {
        return "negative";  
    } else {
        return "zero";
    }
}
```

**Version B:**
```javascript
function checkNumber(n) {
    return n > 0 ? "positive" : n < 0 ? "negative" : "zero";
}
```

**Version C:**
```javascript
let checkNumber = function(n) {
    let result;
    if (n > 0) {
        result = "positive";
    }
    if (n < 0) {
        result = "negative";
    }
    if (n === 0) {
        result = "zero";
    }
    return result;
};
```

**Your ranking and reasoning:**
```
Best (1): Version ___ because: 

Good (2): Version ___ because: 

Worst (3): Version ___ because: 
```

---

## Part III: Advanced Application & Integration (20 minutes, 40 points)

### 11. Situational - Real-World Scenario (15 points)
You're building a simple task management system for a small team. Write functions to handle these requirements:

```javascript
// Starter code - DO NOT MODIFY
let tasks = [];
let taskIdCounter = 1;

// COMPLETE THESE FUNCTIONS:

// Function 1: Add a new task
function addTask(title, assignee, priority) {
    // Create task object with: id, title, assignee, priority, completed: false, createdAt: current date
    // Add to tasks array
    // Return the created task
}

// Function 2: Mark task as completed  
function completeTask(taskId) {
    // Find task by ID and mark as completed
    // Return true if found and updated, false if not found
}

// Function 3: Get tasks by assignee
function getTasksFor(assignee) {
    // Return array of all tasks assigned to the person
    // Include both completed and pending tasks
}

// Test your functions:
addTask("Review code", "Alice", "high");
addTask("Update docs", "Bob", "medium");
addTask("Fix bug", "Alice", "urgent");
completeTask(1);
console.log(getTasksFor("Alice"));
```

**Your solution:**
```javascript
function addTask(title, assignee, priority) {




}

function completeTask(taskId) {




}

function getTasksFor(assignee) {




}
```

### 12. Analyzing - Error Prediction (8 points)
Without running this code, predict what will happen. Explain each issue:

```javascript
function processUserData(userData) {
    let user = userData.profile;
    let fullName = user.firstName + " " + user.lastName;
    
    if (user.age >= 18) {
        user.status = "adult";
    } else {
        user.status = "minor";
    }
    
    return {
        name: fullName,
        status: user.status,
        canVote: user.age >= 18 && user.country === "USA"
    };
}

// Test cases - predict the outcome for each:
let result1 = processUserData({
    profile: { firstName: "Alice", lastName: "Smith", age: 25, country: "USA" }
});

let result2 = processUserData({
    profile: { firstName: "Bob", age: 16 }
});

let result3 = processUserData({
    user: { firstName: "Charlie", lastName: "Brown", age: 30 }
});

let result4 = processUserData(null);
```

**Your predictions:**
```
result1: 

result2: 

result3: 

result4: 
```

### 13. Creating - Design Challenge (17 points)
Design and implement a simple calculator system with these specifications:

**Requirements:**
- Support basic operations: add, subtract, multiply, divide
- Handle multiple calculation methods (function calls vs object methods)
- Include error handling for division by zero and invalid inputs
- Provide a calculation history feature
- Allow clearing the history

```javascript
// Design your solution here - you can choose either functional or object-oriented approach

// Your calculator should support usage like this:
// Method 1: Direct function calls
// calculator.add(5, 3);        // Returns 8
// calculator.subtract(10, 4);   // Returns 6
// calculator.divide(8, 0);     // Returns error message

// Method 2: Chain operations  
// calculator.setValue(10).add(5).multiply(2).getResult(); // Returns 30

// Additional features:
// calculator.getHistory();     // Returns array of past calculations
// calculator.clearHistory();   // Clears the history
```

**Your solution:**
```javascript















```

---

## Bonus Challenge (Optional - 5 extra credit points)
**Integration Thinking**: How would you modify your calculator to work with web APIs? Briefly outline how you might:
1. Save calculation history to a server
2. Share calculations with other users  
3. Handle network errors gracefully

**Your answer:**
```
1. Save to server: 

2. Share with users: 

3. Handle network errors: 
```

---

## Submission Checklist
- [ ] All answers are clearly written and legible
- [ ] Code is properly formatted with consistent indentation
- [ ] Reasoning is provided where requested
- [ ] Time was managed effectively across all sections
- [ ] Solutions are tested mentally or with simple examples

**Total Points: _____ / 100**

**Instructor Use Only:**
- Knowledge & Comprehension: _____ / 25
- Application & Problem-Solving: _____ / 40  
- Analysis & Integration: _____ / 35
- Bonus: _____ / 5