# Development Environment Setup Guide

Follow these steps to prepare your computer for the course. We'll install all necessary tools and verify everything works correctly.

## Step 1: Install Visual Studio Code

### Download and Install
1. Visit [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Download the version for your operating system
3. Run the installer with default settings
4. Launch VS Code to verify installation

## Step 2: Install Node.js

### Download Node.js
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer with default settings
4. Restart your computer after installation

### Verify Installation
Open your terminal/command prompt and run:
```bash
node --version
npm --version
```
You should see version numbers (Node.js 18+ and npm 9+).

## Step 3: Install Git

### Windows
1. Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Run installer with these recommended settings:
   - Use Visual Studio Code as Git's default editor
   - Use Git from the command line and 3rd-party software
   - Use the OpenSSL library
   - Checkout Windows-style, commit Unix-style line endings

### macOS
```bash
# Install using Homebrew (recommended)
brew install git

# Or download from: https://git-scm.com/download/mac
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install git
```

### Verify Git Installation
```bash
git --version
```

## Step 4: Configure Git

Set up your identity for commit tracking:
```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

## Step 5: Create GitHub Account

1. Visit [https://github.com/](https://github.com/)
2. Click "Sign up" and create your account
3. Choose a professional username (this will be part of your developer identity)
4. Verify your email address

## Step 6: Set Up Terminal

### Windows
- Use **Git Bash** (installed with Git) or **Windows Terminal**
- Avoid Command Prompt (cmd) - it lacks modern features

### macOS
- Use the built-in **Terminal** or install **iTerm2** for advanced features

### Linux
- Use your distribution's default terminal

## Step 7: Create Project Directory

Set up your workspace:
```bash
# Create development directory
mkdir ~/development
cd ~/development

# Test creating a simple project
mkdir test-project
cd test-project
npm init -y
```

## Step 8: Test Your Setup

Create a simple test to verify everything works:

### Create test.js
```javascript
// test.js
console.log('Hello, World!');
console.log('Node.js version:', process.version);
console.log('Setup successful! 🎉');
```

### Run the test
```bash
node test.js
```

You should see output confirming your Node.js installation.

## Step 9: Account Setup

### Create Slack Workspace (We'll do this together in Week 15)
- Free Slack workspace for testing integrations
- We'll guide you through this during the Slack development phase

### Anthropic Account (We'll do this together in Week 16)
- Sign up for Claude API access
- We'll cover this when we start AI integration

## Troubleshooting

### Common Issues

**Node.js not found after installation**
- Restart your terminal/computer
- Check if Node.js is in your system PATH

**Git commands not working**
- Ensure Git is added to your system PATH
- Try running commands in Git Bash (Windows)

**VS Code extensions not installing**
- Check your internet connection
- Try restarting VS Code

**Permission errors (macOS/Linux)**
- Use `sudo` for system-level installations
- Consider using Node Version Manager (nvm) for Node.js

### Getting Help
- Post screenshots of error messages in course forums
- Include your operating system and version numbers
- Try the exact commands shown in this guide

## Verification Checklist

Before proceeding to Week 1, confirm:
- [ ] VS Code opens and runs
- [ ] Node.js and npm commands work in terminal
- [ ] Git commands work in terminal
- [ ] GitHub account created and SSH key added
- [ ] Can create files and folders in development directory
- [ ] Test JavaScript file runs successfully

## Next Steps

Once your environment is ready, begin with [Week 1: Programming Fundamentals](phase-1-foundations/week-01-programming-fundamentals.md).

Need help with setup? Reach out during office hours or in the course forums!