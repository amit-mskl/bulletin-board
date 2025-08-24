# Lab 3: Web Requests Basics

**Duration:** 50-65 minutes  
**Prerequisites:** Lab 1 & 2 completed, understanding of functions and variables  
**Difficulty:** Beginner to Intermediate

## Lab Overview

This lab introduces you to web concepts and HTTP requests - the foundation of all web applications. You'll learn how web browsers communicate with servers, understand different types of requests, and build a simple web page that connects to online services. This prepares you for building the bulletin board system.

## Learning Goals

- Understand how the web works (HTTP, requests, responses)
- Create your first HTML page with embedded JavaScript
- Make HTTP requests to retrieve data from web services
- Handle responses and display data dynamically
- Learn about JSON data format
- Build a simple dashboard that fetches real information

## Part 1: Understanding Web Fundamentals (15 minutes)

### Step 1: Create Your Web Lab Environment
```bash
# Navigate to your development folder
cd ~/development

# Create lab directory
mkdir lab-03-web-requests
cd lab-03-web-requests

# Open in VS Code
code .
```

### Step 2: Create Your First Web Page
Create a new file: `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 3: Web Requests</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .data-section {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }
        button:hover {
            background-color: #0056b3;
        }
        .loading {
            color: #666;
            font-style: italic;
        }
        .error {
            color: #d32f2f;
            font-weight: bold;
        }
        .success {
            color: #388e3c;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 Web Requests Dashboard</h1>
        <p>This lab demonstrates how JavaScript can communicate with web services to fetch and display data.</p>
        
        <div class="data-section">
            <h2>📰 Random Fun Fact</h2>
            <button onclick="fetchRandomFact()">Get Random Fact</button>
            <div id="fact-display">Click the button to load a random fact!</div>
        </div>
        
        <div class="data-section">
            <h2>🌤️ Weather Information</h2>
            <button onclick="fetchWeatherDemo()">Get Weather Demo</button>
            <div id="weather-display">Click to see weather demo data</div>
        </div>
        
        <div class="data-section">
            <h2>🔢 Programming Joke</h2>
            <button onclick="fetchProgrammingJoke()">Get Joke</button>
            <div id="joke-display">Click for a programming joke!</div>
        </div>
        
        <div class="data-section">
            <h2>📊 Request Log</h2>
            <div id="request-log"></div>
        </div>
    </div>

    <script src="web-requests.js"></script>
</body>
</html>
```

### Step 3: Understanding Web Request Basics
Create a new file: `web-requests.js`

```javascript
// Lab 3: Web Requests Basics
// Understanding how web communication works

// Global variables to track our requests
let requestCounter = 0;
let requestLog = [];

// Helper function to log requests
function logRequest(type, url, status, data) {
    requestCounter++;
    let logEntry = {
        id: requestCounter,
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        url: url,
        status: status,
        dataReceived: data ? "Yes" : "No"
    };
    
    requestLog.push(logEntry);
    updateRequestLog();
    
    console.log("Request #" + requestCounter + ":", logEntry);
}

// Function to update the request log display
function updateRequestLog() {
    let logDiv = document.getElementById("request-log");
    let logHTML = "<h3>Recent Requests:</h3>";
    
    if (requestLog.length === 0) {
        logHTML += "<p>No requests yet.</p>";
    } else {
        // Show last 5 requests
        let recentRequests = requestLog.slice(-5);
        logHTML += "<ul>";
        for (let i = recentRequests.length - 1; i >= 0; i--) {
            let req = recentRequests[i];
            logHTML += "<li><strong>" + req.timestamp + "</strong> - " + 
                      req.type + " to " + req.url + " (" + req.status + ")</li>";
        }
        logHTML += "</ul>";
    }
    
    logDiv.innerHTML = logHTML;
}

// Demonstrate what happens when we make web requests
function demonstrateWebConcepts() {
    console.log("=== Web Request Concepts ===");
    console.log("1. HTTP Methods:");
    console.log("   - GET: Retrieve data from server");
    console.log("   - POST: Send data to server");
    console.log("   - PUT: Update existing data");
    console.log("   - DELETE: Remove data");
    console.log("");
    console.log("2. Status Codes:");
    console.log("   - 200: Success");
    console.log("   - 404: Not Found");
    console.log("   - 500: Server Error");
    console.log("");
    console.log("3. Data Formats:");
    console.log("   - JSON: JavaScript Object Notation (most common)");
    console.log("   - XML: eXtensible Markup Language");
    console.log("   - Plain text");
}

// Call this when page loads
demonstrateWebConcepts();
```

### Step 4: Test Your Setup
1. Open `index.html` in your web browser (double-click the file)
2. Open the browser's Developer Console (F12, then Console tab)
3. Verify you see the web concepts logged in the console

## Part 2: Making HTTP Requests (20 minutes)

### Step 1: Your First API Request
Add these functions to `web-requests.js`:

```javascript
// Function to fetch a random fact
async function fetchRandomFact() {
    let factDiv = document.getElementById("fact-display");
    factDiv.innerHTML = '<div class="loading">🔄 Loading random fact...</div>';
    
    try {
        // This is a real API call!
        let response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
        
        if (response.ok) {
            let data = await response.json();
            logRequest("GET", "uselessfacts API", "200 OK", true);
            
            factDiv.innerHTML = '<div class="success"><strong>Random Fact:</strong><br>' + 
                               data.text + '</div>';
        } else {
            throw new Error("HTTP " + response.status);
        }
        
    } catch (error) {
        logRequest("GET", "uselessfacts API", "ERROR", false);
        factDiv.innerHTML = '<div class="error">Error loading fact: ' + error.message + '</div>';
        console.error("Error:", error);
    }
}

// Function to demonstrate weather API concept (using mock data)
async function fetchWeatherDemo() {
    let weatherDiv = document.getElementById("weather-display");
    weatherDiv.innerHTML = '<div class="loading">🔄 Loading weather data...</div>';
    
    try {
        // Simulate an API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data (in real apps, this would come from a weather API)
        let mockWeatherData = {
            city: "San Francisco",
            temperature: 22,
            condition: "Partly Cloudy",
            humidity: 65,
            windSpeed: 12
        };
        
        logRequest("GET", "Weather API (demo)", "200 OK", true);
        
        weatherDiv.innerHTML = 
            '<div class="success">' +
            '<strong>Weather for ' + mockWeatherData.city + ':</strong><br>' +
            '🌡️ Temperature: ' + mockWeatherData.temperature + '°C<br>' +
            '☁️ Condition: ' + mockWeatherData.condition + '<br>' +
            '💧 Humidity: ' + mockWeatherData.humidity + '%<br>' +
            '💨 Wind: ' + mockWeatherData.windSpeed + ' km/h' +
            '</div>';
            
    } catch (error) {
        logRequest("GET", "Weather API (demo)", "ERROR", false);
        weatherDiv.innerHTML = '<div class="error">Error loading weather: ' + error.message + '</div>';
    }
}

// Function to fetch programming jokes
async function fetchProgrammingJoke() {
    let jokeDiv = document.getElementById("joke-display");
    jokeDiv.innerHTML = '<div class="loading">🔄 Loading programming joke...</div>';
    
    try {
        let response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
        
        if (response.ok) {
            let jokes = await response.json();
            let joke = jokes[0]; // API returns an array
            
            logRequest("GET", "Programming Jokes API", "200 OK", true);
            
            jokeDiv.innerHTML = 
                '<div class="success">' +
                '<strong>Programming Joke:</strong><br>' +
                '<em>Q: ' + joke.setup + '</em><br>' +
                '<strong>A: ' + joke.punchline + '</strong>' +
                '</div>';
        } else {
            throw new Error("HTTP " + response.status);
        }
        
    } catch (error) {
        logRequest("GET", "Programming Jokes API", "ERROR", false);
        jokeDiv.innerHTML = '<div class="error">Error loading joke: ' + error.message + '</div>';
        console.error("Error:", error);
    }
}
```

### Step 2: Understanding the Code
Add this educational function:

```javascript
// Function to explain what just happened
function explainWebRequest() {
    console.log("=== What Happens in a Web Request ===");
    console.log("1. Browser sends HTTP request to server");
    console.log("2. Server processes the request");
    console.log("3. Server sends back HTTP response with data");
    console.log("4. Browser receives response and parses data");
    console.log("5. JavaScript updates the web page with new data");
    console.log("");
    console.log("Key concepts:");
    console.log("- fetch(): Modern JavaScript function to make HTTP requests");
    console.log("- async/await: Handle requests that take time to complete");
    console.log("- JSON: Data format that looks like JavaScript objects");
    console.log("- Error handling: What to do when requests fail");
}

// Add this to run when page loads
window.addEventListener('load', function() {
    console.log("🌐 Web page loaded! Try clicking the buttons to make requests.");
    explainWebRequest();
});
```

## Part 3: Working with Different Data Types (15 minutes)

### Step 1: Understanding JSON Data
Add this section to `web-requests.js`:

```javascript
// Function to demonstrate working with JSON data
function demonstrateJSONHandling() {
    console.log("=== Working with JSON Data ===");
    
    // Example JSON data (like what APIs return)
    let jsonString = '{"name": "Alice", "age": 28, "skills": ["JavaScript", "Python", "SQL"]}';
    console.log("1. JSON string:", jsonString);
    
    // Parse JSON string into JavaScript object
    let personObject = JSON.parse(jsonString);
    console.log("2. Parsed object:", personObject);
    console.log("3. Access properties:", personObject.name, personObject.age);
    console.log("4. Access array:", personObject.skills);
    
    // Convert JavaScript object back to JSON
    let backToJSON = JSON.stringify(personObject);
    console.log("5. Back to JSON:", backToJSON);
    
    // Working with nested objects (common in APIs)
    let complexData = {
        user: {
            profile: {
                name: "Bob",
                location: {
                    city: "New York",
                    country: "USA"
                }
            }
        },
        tasks: [
            { title: "Learn APIs", completed: false },
            { title: "Build web app", completed: true }
        ]
    };
    
    console.log("6. Complex data access:");
    console.log("   User name:", complexData.user.profile.name);
    console.log("   User city:", complexData.user.profile.location.city);
    console.log("   First task:", complexData.tasks[0].title);
    console.log("   Completed tasks:", complexData.tasks.filter(t => t.completed).length);
}

// Call this function
demonstrateJSONHandling();
```

### Step 2: Error Handling and Edge Cases
Add these robust request functions:

```javascript
// Advanced request function with comprehensive error handling
async function makeRobustRequest(url, options = {}) {
    console.log("🚀 Making request to:", url);
    
    try {
        // Set a timeout for the request
        let controller = new AbortController();
        let timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        let response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Try to parse as JSON
        let data = await response.json();
        
        console.log("✅ Request successful:", data);
        return { success: true, data: data, error: null };
        
    } catch (error) {
        console.error("❌ Request failed:", error.message);
        
        let errorType = "Unknown error";
        if (error.name === "AbortError") {
            errorType = "Request timeout";
        } else if (error.message.includes("HTTP")) {
            errorType = "Server error";
        } else if (error.message.includes("Failed to fetch")) {
            errorType = "Network error";
        }
        
        return { success: false, data: null, error: errorType };
    }
}

// Function to test different error scenarios
async function testErrorHandling() {
    console.log("\n=== Testing Error Handling ===");
    
    // Test successful request
    let result1 = await makeRobustRequest('https://httpbin.org/json');
    console.log("Success test:", result1.success);
    
    // Test 404 error
    let result2 = await makeRobustRequest('https://httpbin.org/status/404');
    console.log("404 test:", result2.success, result2.error);
    
    // Test network error (invalid URL)
    let result3 = await makeRobustRequest('https://invalid-url-that-does-not-exist.com');
    console.log("Network error test:", result3.success, result3.error);
}

// Add button to test error handling
function addErrorTestButton() {
    let container = document.querySelector('.container');
    let errorSection = document.createElement('div');
    errorSection.className = 'data-section';
    errorSection.innerHTML = `
        <h2>🔧 Error Handling Test</h2>
        <button onclick="testErrorHandling()">Test Different Error Types</button>
        <p><em>Check the console to see error handling in action!</em></p>
    `;
    container.appendChild(errorSection);
}

// Add the error test section when page loads
window.addEventListener('load', addErrorTestButton);
```

## Part 4: Building a Mini Dashboard (10 minutes)

### Step 1: Create a Data Aggregator
Add this dashboard functionality:

```javascript
// Dashboard that combines multiple data sources
class WebDashboard {
    constructor() {
        this.data = {
            facts: [],
            jokes: [],
            weather: null,
            lastUpdate: null
        };
    }
    
    async loadAllData() {
        console.log("📊 Loading dashboard data...");
        let dashboardDiv = document.getElementById("dashboard-display");
        
        if (!dashboardDiv) {
            this.createDashboardElement();
            dashboardDiv = document.getElementById("dashboard-display");
        }
        
        dashboardDiv.innerHTML = '<div class="loading">🔄 Loading dashboard...</div>';
        
        try {
            // Load multiple pieces of data
            let results = await Promise.all([
                this.loadFacts(3),
                this.loadJokes(2),
                this.loadWeather()
            ]);
            
            this.data.facts = results[0];
            this.data.jokes = results[1];
            this.data.weather = results[2];
            this.data.lastUpdate = new Date().toLocaleString();
            
            this.displayDashboard();
            
        } catch (error) {
            dashboardDiv.innerHTML = '<div class="error">Dashboard load failed: ' + error.message + '</div>';
        }
    }
    
    async loadFacts(count) {
        let facts = [];
        for (let i = 0; i < count; i++) {
            try {
                let response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');
                if (response.ok) {
                    let data = await response.json();
                    facts.push(data.text);
                }
            } catch (error) {
                console.log("Failed to load fact", i + 1);
            }
        }
        return facts;
    }
    
    async loadJokes(count) {
        let jokes = [];
        for (let i = 0; i < count; i++) {
            try {
                let response = await fetch('https://official-joke-api.appspot.com/jokes/programming/random');
                if (response.ok) {
                    let data = await response.json();
                    jokes.push(data[0]);
                }
            } catch (error) {
                console.log("Failed to load joke", i + 1);
            }
        }
        return jokes;
    }
    
    async loadWeather() {
        // Mock weather data for demo
        return {
            city: "Demo City",
            temp: Math.round(Math.random() * 30) + 5,
            condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][Math.floor(Math.random() * 4)]
        };
    }
    
    createDashboardElement() {
        let container = document.querySelector('.container');
        let dashboardSection = document.createElement('div');
        dashboardSection.className = 'data-section';
        dashboardSection.innerHTML = `
            <h2>📊 Complete Dashboard</h2>
            <button onclick="dashboard.loadAllData()">Load Full Dashboard</button>
            <div id="dashboard-display">Click to load complete dashboard!</div>
        `;
        container.appendChild(dashboardSection);
    }
    
    displayDashboard() {
        let html = `
            <div class="success">
                <h3>📊 Dashboard Data (Updated: ${this.data.lastUpdate})</h3>
                
                <h4>📰 Random Facts (${this.data.facts.length})</h4>
                <ul>
                    ${this.data.facts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
                
                <h4>😄 Programming Jokes (${this.data.jokes.length})</h4>
                ${this.data.jokes.map(joke => `
                    <div style="margin: 10px 0; padding: 10px; border-left: 3px solid #007bff;">
                        <em>Q: ${joke.setup}</em><br>
                        <strong>A: ${joke.punchline}</strong>
                    </div>
                `).join('')}
                
                <h4>🌤️ Weather</h4>
                <p><strong>${this.data.weather.city}:</strong> ${this.data.weather.temp}°C, ${this.data.weather.condition}</p>
                
                <p><em>This dashboard demonstrates fetching and combining data from multiple web services!</em></p>
            </div>
        `;
        
        document.getElementById("dashboard-display").innerHTML = html;
        logRequest("GET", "Multiple APIs", "200 OK", true);
    }
}

// Create global dashboard instance
let dashboard = new WebDashboard();
```

## Part 5: Lab Challenge - Personal Information Hub (15 minutes)

### Challenge: Build Your Own Data Hub
Create a personal dashboard that fetches information relevant to developers:

```javascript
// Challenge: Personal Developer Information Hub
class DeveloperHub {
    constructor() {
        this.hubData = {
            githubTrends: [],
            techNews: [],
            codingTips: [],
            inspirationalQuotes: []
        };
    }
    
    async fetchGitHubTrends() {
        // Challenge: Research GitHub API and fetch trending repositories
        // Hint: Use https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc
        // Your code here
    }
    
    async fetchTechNews() {
        // Challenge: Find a tech news API and fetch latest articles
        // Your code here
    }
    
    async fetchCodingTips() {
        // Challenge: Create your own list of coding tips or find an API
        // Your code here
    }
    
    async fetchInspirationalQuotes() {
        // Challenge: Find a quotes API focused on motivation/programming
        // Your code here
    }
    
    async loadDeveloperHub() {
        // Challenge: Combine all the data sources above
        // Display in a beautiful developer-focused dashboard
        // Your code here
    }
    
    displayHub() {
        // Challenge: Create an attractive display for all your data
        // Your code here
    }
}

// Add your challenge code here and test it!
```

## Expected Outcomes

After completing this lab, you should be able to:
- ✅ Understand how HTTP requests and responses work
- ✅ Create web pages with HTML, CSS, and JavaScript
- ✅ Use fetch() to make API requests
- ✅ Handle JSON data and extract information
- ✅ Implement proper error handling for network requests
- ✅ Build interactive dashboards that display live data
- ✅ Combine multiple data sources into a unified interface

## Common Issues and Solutions

### CORS Errors
```
Access to fetch at 'api-url' from origin 'null' has been blocked by CORS policy
```
**Solution:** Some APIs don't allow requests from local files. Use a local server or APIs that support CORS.

### JSON Parsing Errors
```javascript
// Problem: Trying to parse non-JSON response
let data = await response.json(); // Fails if response is not JSON

// Solution: Check content type first
let contentType = response.headers.get("content-type");
if (contentType && contentType.includes("application/json")) {
    let data = await response.json();
} else {
    let text = await response.text();
}
```

### Network Timeouts
```javascript
// Problem: Requests that never complete
await fetch(url); // Might hang forever

// Solution: Use AbortController with timeout
let controller = new AbortController();
setTimeout(() => controller.abort(), 5000);
let response = await fetch(url, { signal: controller.signal });
```

## Real-World Applications

The concepts from this lab are used in:
- **Social Media Apps**: Fetching posts, comments, user profiles
- **Weather Apps**: Getting current conditions and forecasts  
- **News Websites**: Loading articles and updates
- **E-commerce**: Product catalogs, pricing, inventory
- **Our Bulletin Board**: Fetching tasks, user updates, AI summaries

## Next Steps

Fantastic work! You've learned the fundamentals of web communication that power all modern web applications.

**Before Week 2:**
1. Complete the Developer Hub challenge
2. Explore different public APIs (try https://jsonplaceholder.typicode.com/)
3. Practice combining data from multiple sources
4. Experiment with error handling scenarios

**Coming up in Week 2:** We'll dive deeper into JavaScript with arrays, loops, and more advanced programming concepts to build more sophisticated applications!

## Testing Your Lab

1. Open `index.html` in your browser
2. Test all buttons and verify they work
3. Open Developer Console and observe the request logs
4. Try refreshing the page multiple times
5. Check that error scenarios are handled gracefully

## API Resources for Exploration

### Free APIs to Try:
- **JSONPlaceholder**: https://jsonplaceholder.typicode.com/ (Fake data for testing)
- **Cat Facts**: https://catfact.ninja/fact (Random cat facts)
- **REST Countries**: https://restcountries.com/v3.1/all (Country information)
- **GitHub API**: https://api.github.com/users/octocat (User profiles)

### Safety Notes:
- Never include API keys in client-side code
- Always handle errors gracefully
- Respect API rate limits
- Read API documentation before using

Great job completing Week 1! You've built a solid foundation in programming fundamentals, functions, variables, and web communication!