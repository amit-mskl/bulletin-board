# Week 1: Programming Fundamentals

## Learning Objectives

By the end of this week, you will:
- Understand what programming is and how computers execute code
- Know the basic building blocks of any programming language
- Write your first JavaScript programs
- Use variables, functions, and basic data types
- Debug simple programs and understand error messages

## Why This Matters

Programming is problem-solving with precise instructions. Every complex application (like our bulletin board) starts with these fundamentals. Master these concepts now, and everything else becomes manageable.

## Core Concepts

### What is Programming?
Programming is giving computers step-by-step instructions to solve problems. Think of it like writing a very detailed recipe that a computer can follow exactly.

### Key Programming Concepts
1. **Variables** - Store and label information
2. **Functions** - Reusable blocks of code that perform tasks
3. **Data Types** - Different kinds of information (text, numbers, true/false)
4. **Logic** - Making decisions and controlling program flow
5. **Debugging** - Finding and fixing problems in code

## This Week's Journey

### Day 1-2: Understanding Programming
- What happens when code runs
- Introduction to JavaScript
- Your first "Hello World" program
- Using the browser console

### Day 3-4: Variables and Data Types
- Storing information in variables
- Numbers, strings (text), and booleans (true/false)
- Naming conventions and best practices

### Day 5-6: Functions and Logic
- Creating functions to organize code
- Making decisions with if/else statements
- Understanding program flow

### Day 7: Practice and Review
- Hands-on coding exercises
- Debugging practice
- Building a simple interactive program

## Hands-On Activities

### Activity 1: Your First Program (30 minutes)
Create a program that introduces you:
```javascript
// Your first JavaScript program
let name = "Your Name";
let favoriteColor = "blue";

console.log("Hello! My name is " + name);
console.log("My favorite color is " + favoriteColor);
```

### Activity 2: Calculator Functions (45 minutes)
Build simple math functions:
```javascript
function add(a, b) {
    return a + b;
}

function greetUser(name) {
    return "Welcome to programming, " + name + "!";
}

// Test your functions
console.log(add(5, 3));
console.log(greetUser("Alex"));
```

### Activity 3: Decision Making (30 minutes)
Create a program that responds to different inputs:
```javascript
function checkWeather(temperature) {
    if (temperature > 70) {
        return "It's warm! Great day for a walk.";
    } else if (temperature > 50) {
        return "It's cool. Maybe bring a light jacket.";
    } else {
        return "It's cold! Bundle up!";
    }
}

console.log(checkWeather(75));
console.log(checkWeather(60));
console.log(checkWeather(40));
```

## Key Vocabulary

- **Variable**: A container that stores data values
- **Function**: A reusable block of code that performs a specific task
- **Parameter**: Input values that functions can accept
- **Return**: The output value that a function gives back
- **Console**: A tool for displaying output and debugging programs
- **String**: Text data (always in quotes: "like this")
- **Number**: Numeric data (like 42 or 3.14)
- **Boolean**: True or false values

## Common Beginner Mistakes

### Syntax Errors
```javascript
// Wrong - missing quotes
let message = Hello World;

// Right - text needs quotes
let message = "Hello World";
```

### Case Sensitivity
```javascript
// Wrong - JavaScript is case-sensitive
let userName = "Alex";
console.log(username); // Error! 'username' is not defined

// Right - exact spelling and capitalization
console.log(userName);
```

### Missing Semicolons
```javascript
// Works but not recommended
let age = 25
let name = "Sam"

// Better - clear statement endings
let age = 25;
let name = "Sam";
```

## Practice Challenges

### Challenge 1: Personal Greeting (Beginner)
Create a function that takes a name and time of day, then returns an appropriate greeting.

**Example Output:**
- `greet("Sarah", "morning")` → "Good morning, Sarah!"
- `greet("Mike", "evening")` → "Good evening, Mike!"

### Challenge 2: Simple Calculator (Intermediate)
Build a calculator that performs basic math operations.

**Requirements:**
- Functions for add, subtract, multiply, divide
- Handle division by zero
- Return clear error messages for invalid inputs

### Challenge 3: Age Calculator (Advanced)
Create a program that calculates someone's age and provides appropriate responses.

**Requirements:**
- Input: birth year
- Output: age and life stage (child, teen, adult, senior)
- Handle invalid years (future dates, unrealistic ages)

## Debugging Practice

### Common Error Messages and Solutions

**"ReferenceError: variable is not defined"**
- Check spelling and capitalization
- Make sure you declared the variable with `let` or `const`

**"SyntaxError: Unexpected token"**
- Check for missing quotes, parentheses, or brackets
- Ensure proper punctuation

**"TypeError: function is not a function"**
- Verify the function name spelling
- Make sure you defined the function before calling it

## Week 1 Project: Personal Information System

Build a simple program that stores and displays personal information:

### Requirements
- Store your name, age, favorite hobbies (3-5), and a fun fact
- Create functions to display different pieces of information
- Include a function that gives different responses based on age ranges
- Add error handling for invalid inputs

### Sample Structure
```javascript
// Your information
let personalInfo = {
    name: "Your Name",
    age: 25,
    hobbies: ["reading", "hiking", "coding"],
    funFact: "I can solve a Rubik's cube!"
};

// Functions to display information
function introduce() {
    // Your code here
}

function listHobbies() {
    // Your code here  
}

function ageCategorizer(age) {
    // Your code here
}
```

## Resources for This Week

### Essential Reading
- [MDN JavaScript Basics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [JavaScript Variables Guide](https://javascript.info/variables)

### Practice Platforms
- [freeCodeCamp JavaScript Basics](https://www.freecodecamp.org/learn)
- [Codecademy JavaScript Course](https://www.codecademy.com/learn/introduction-to-javascript)

### Tools You'll Use
- Browser Developer Console (F12 in Chrome/Firefox)
- Visual Studio Code with JavaScript files
- Node.js for running JavaScript outside the browser

## Preparing for Week 2

Next week we'll dive deeper into JavaScript, covering:
- Arrays and objects for storing multiple pieces of data
- Loops for repeating actions
- More advanced functions and scope
- Introduction to DOM manipulation (making web pages interactive)

Make sure you're comfortable with this week's concepts before moving forward!

## Getting Help

### During the Week
- Try the code examples yourself
- Experiment with changing values and see what happens
- Don't just read - type out every code example
- When stuck, re-read the concept explanation

### If You're Struggling
- Review the common mistakes section
- Practice the vocabulary terms
- Start with the beginner challenge and work up
- Ask questions in the course forum with specific code examples

Remember: Everyone learns programming at their own pace. The goal is understanding, not speed!