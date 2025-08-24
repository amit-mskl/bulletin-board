# Lab 1: Your First JavaScript Program

**Duration:** 45-60 minutes  
**Prerequisites:** Completed setup guide, VS Code installed  
**Difficulty:** Beginner

## Lab Overview

In this lab, you'll write and run your very first JavaScript programs. You'll learn to use the browser console, create variables, and write simple functions. By the end, you'll have a working program that tells your story!

## Learning Goals

- Run JavaScript code in the browser console
- Create and use variables to store information
- Write your first function
- Understand basic debugging techniques
- Create a simple interactive program

## Part 1: Setting Up Your Workspace (10 minutes)

### Step 1: Create Your Lab Directory
```bash
# Navigate to your development folder
cd ~/development

# Create a folder for this lab
mkdir lab-01-first-program
cd lab-01-first-program
```

### Step 2: Open VS Code
```bash
# Open current directory in VS Code
code .
```

### Step 3: Create Your First JavaScript File
1. In VS Code, create a new file: `first-program.js`
2. Add this starter code:

```javascript
// Lab 1: My First JavaScript Program
// Your name: [Add your name here]
// Date: [Add today's date]

console.log("Welcome to my first JavaScript program!");
```

### Step 4: Test Your Setup
1. Save the file (Ctrl+S / Cmd+S)
2. Open Terminal in VS Code (Terminal → New Terminal)
3. Run your program:
```bash
node first-program.js
```

**Expected Output:**
```
Welcome to my first JavaScript program!
```

If you see this message, you're ready to continue!

## Part 2: Working with Variables (15 minutes)

### Step 1: Store Personal Information
Add this code to your `first-program.js` file:

```javascript
// Personal Information Variables
let myName = "Your Full Name";
let myAge = 25; // Replace with your age
let myCity = "Your City";
let isStudent = true; // true if you're currently a student, false if not
let favoriteNumber = 7; // Pick any number

// Display the information
console.log("=== About Me ===");
console.log("Name: " + myName);
console.log("Age: " + myAge);
console.log("City: " + myCity);
console.log("Am I a student? " + isStudent);
console.log("My favorite number is: " + favoriteNumber);
```

### Step 2: Run and Test
1. Save your file
2. Run it with `node first-program.js`
3. Verify all your information displays correctly

### Step 3: Experiment with Different Data Types
Add these examples and observe the differences:

```javascript
// Different ways to work with data
let fullName = myName; // Copy a variable
let ageNextYear = myAge + 1; // Math with numbers
let greeting = "Hello, my name is " + myName; // Combining text
let isAdult = myAge >= 18; // Boolean logic

console.log("=== Experiments ===");
console.log("Full name: " + fullName);
console.log("Age next year: " + ageNextYear);
console.log("Greeting: " + greeting);
console.log("Am I an adult? " + isAdult);
```

## Part 3: Your First Functions (15 minutes)

Functions are reusable blocks of code. Let's create some!

### Step 1: Create a Greeting Function
Add this code to your file:

```javascript
// My first function!
function sayHello(name) {
    return "Hello there, " + name + "! Nice to meet you.";
}

// Test the function
console.log("=== Function Tests ===");
console.log(sayHello("Alice"));
console.log(sayHello("Bob"));
console.log(sayHello(myName)); // Use your variable!
```

### Step 2: Create a Math Function
```javascript
// A function that does calculations
function calculateYearsToAge(currentAge, targetAge) {
    let yearsNeeded = targetAge - currentAge;
    
    if (yearsNeeded > 0) {
        return "You need " + yearsNeeded + " more years to reach " + targetAge;
    } else if (yearsNeeded < 0) {
        return "You passed age " + targetAge + " about " + Math.abs(yearsNeeded) + " years ago";
    } else {
        return "You are exactly " + targetAge + " years old!";
    }
}

// Test with different ages
console.log(calculateYearsToAge(myAge, 30));
console.log(calculateYearsToAge(myAge, 65));
console.log(calculateYearsToAge(myAge, myAge));
```

### Step 3: Create a Decision-Making Function
```javascript
// Function that makes decisions based on input
function describeWeather(temperature) {
    if (temperature > 80) {
        return "It's hot! Perfect for swimming.";
    } else if (temperature > 60) {
        return "Nice weather for a walk.";
    } else if (temperature > 32) {
        return "A bit chilly, bring a jacket.";
    } else {
        return "Freezing! Stay inside with hot cocoa.";
    }
}

// Test different temperatures
console.log("=== Weather Reports ===");
console.log("90°F: " + describeWeather(90));
console.log("70°F: " + describeWeather(70));
console.log("45°F: " + describeWeather(45));
console.log("25°F: " + describeWeather(25));
```

## Part 4: Interactive Story Generator (10 minutes)

Now let's combine everything into a fun interactive program!

```javascript
// Story Generator Function
function generateStory(characterName, age, occupation, hobby) {
    let story = "Once upon a time, there was a " + age + "-year-old " + occupation + " named " + characterName + ". ";
    story += "Every day after work, " + characterName + " loved to " + hobby + ". ";
    
    if (age < 25) {
        story += "Being young and energetic, " + characterName + " dreamed of great adventures ahead.";
    } else if (age < 50) {
        story += "With years of experience, " + characterName + " had become quite skilled at " + hobby + ".";
    } else {
        story += "With wisdom that comes with age, " + characterName + " was a master of " + hobby + ".";
    }
    
    return story;
}

// Generate different stories
console.log("=== Story Time ===");
console.log(generateStory("Sarah", 28, "teacher", "paint landscapes"));
console.log("---");
console.log(generateStory("Mike", 22, "chef", "play guitar"));
console.log("---");
console.log(generateStory(myName, myAge, "programmer", "solve coding puzzles"));
```

## Part 5: Debugging Practice (10 minutes)

Let's practice finding and fixing common errors. Try adding this buggy code and fix it:

```javascript
// Buggy code - can you spot and fix the errors?

// Error 1: Missing quotes
let message = Hello World;

// Error 2: Wrong variable name (case sensitivity)
let userName = "Alex";
console.log(username);

// Error 3: Missing parenthesis
function broken(name {
    return "Hello " + name;
}

// Error 4: Using undefined variable
console.log("The value is: " + undefinedVariable);
```

### Common Solutions:
```javascript
// Fixed version:

// Fix 1: Add quotes around text
let message = "Hello World";

// Fix 2: Match exact variable name
let userName = "Alex";
console.log(userName);

// Fix 3: Add missing parenthesis
function fixed(name) {
    return "Hello " + name;
}

// Fix 4: Define the variable first
let definedVariable = "42";
console.log("The value is: " + definedVariable);
```

## Lab Challenge: Build Your Digital Business Card

Create a program that acts like a digital business card. It should include:

### Requirements:
1. **Personal Info**: Name, title, contact information
2. **Skills Function**: Takes a skill level (1-10) and returns a description
3. **Availability Function**: Takes day of week, returns if you're available
4. **Bio Generator**: Creates a professional bio based on your information

### Starter Template:
```javascript
// Digital Business Card Challenge

// Your information
let fullName = "Your Name";
let jobTitle = "Aspiring Developer";
let email = "your.email@example.com";
let skills = ["JavaScript", "Problem Solving", "Learning"];

// Skill level interpreter
function describeSkillLevel(level) {
    // Your code here - return description based on level 1-10
}

// Availability checker
function checkAvailability(dayOfWeek) {
    // Your code here - return availability message
}

// Bio generator
function generateBio() {
    // Your code here - create a professional bio
}

// Display your business card
console.log("=== DIGITAL BUSINESS CARD ===");
// Add your display code here
```

## Expected Outcomes

After completing this lab, you should be able to:
- ✅ Create and run JavaScript files
- ✅ Use variables to store different types of data
- ✅ Write functions that accept parameters and return values
- ✅ Use if/else statements for decision making
- ✅ Debug basic syntax errors
- ✅ Combine multiple concepts into a working program

## Troubleshooting

### "node: command not found"
- Make sure Node.js is installed and in your system PATH
- Try restarting your terminal/VS Code
- On Windows, try using Git Bash instead of Command Prompt

### "Cannot find module"
- Make sure you're in the correct directory
- Check that your file is saved with the `.js` extension

### Syntax errors when running
- Check for missing quotes, parentheses, or semicolons
- Verify variable names match exactly (case-sensitive)
- Make sure functions are defined before they're called

## Next Steps

Great job completing your first lab! You've written real JavaScript code and created working programs. 

**Before next week:**
1. Experiment with the code - try changing values and see what happens
2. Create your own functions with different logic
3. Try the business card challenge if you haven't already

**Coming up in Lab 2:** We'll learn about arrays, loops, and more complex data handling to build a task management system!

## Submission (Optional)

If you're taking this course with an instructor:
1. Save your completed `first-program.js` file
2. Take a screenshot of your successful program output
3. Write a brief reflection: What was the most challenging part? What did you learn?

Keep your code - you'll reference these fundamentals throughout the entire course!