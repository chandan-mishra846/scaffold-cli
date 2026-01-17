# Create-Project-CLI

A lightweight command-line utility that automates project scaffolding and eliminates the repetitive task of creating folder structures, configuration files, and boilerplate code for new projects.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

---

## 📋 Table of Contents

- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Features](#-features)
- [Installation & Setup](#-installation--setup)
- [Usage](#-usage)
- [Templates](#-templates)
- [Design Decisions](#-design-decisions)
- [Sample Output](#-sample-output)
- [Examples](#-examples)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Requirements](#-requirements)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)
- [License](#-license)

---

## 🎯 The Problem

As a developer, I frequently start new projects for practice, assignments, or experiments. Every time I create a new project, I find myself:

1. **Manually creating the same folder structure** (src/, utils/, tests/, etc.)
2. **Creating boilerplate files** (README.md, .gitignore, package.json)
3. **Writing initial configuration code** that's nearly identical across projects
4. **Initializing Git repositories** and making initial commits
5. **Wasting 10-15 minutes** on setup instead of actually coding

This repetitive process is:
- ⏰ **Time-consuming**: Takes away focus from actual development
- 😫 **Tedious**: Requires doing the same thing over and over
- ❌ **Error-prone**: Easy to forget files or make typos in configuration
- 📂 **Inconsistent**: Different projects end up with different structures

**Real-world scenario**: When working on competitive programming or web development practice, I want to quickly spin up a project structure and start coding immediately, not spend time on setup.

---

## ✅ The Solution

**create-project-cli** is a command-line tool that:

✨ **Instantly generates** complete project structures with a single command  
📁 **Creates organized folders** (src/, utils/, tests/, config/, etc.)  
📝 **Generates boilerplate code** tailored to your project type  
🎨 **Supports multiple templates** (web, API, CLI, basic)  
🔧 **Configures Git automatically** with initial commit  
⚡ **Saves 10-15 minutes** per project setup  

Instead of manually creating files, you simply run:
```bash
node index.js my-awesome-project --template web --git
```

And you're ready to code!

---

## 🚀 Features

- **Zero Dependencies**: Uses only Node.js standard libraries (fs, path, child_process)
- **Multiple Templates**: Choose from web, API, CLI, or basic project structures
- **Smart Validation**: Prevents duplicate project names and invalid characters
- **Git Integration**: Optionally initialize Git repository with first commit
- **Color-Coded Output**: Clear, beautiful terminal feedback
- **Comprehensive Error Handling**: Graceful handling of edge cases
- **Modular Architecture**: Clean separation of concerns (ArgumentParser, TemplateGenerator, Logger)
- **Fully Tested**: Includes automated test suite

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (version 14 or higher)
- **Git** (optional, for --git flag)

### Setup

1. **Clone or download this repository**:
   ```bash
   cd create-project-cli
   ```

2. **No installation required!** This tool uses only standard Node.js libraries.

3. **Make the script executable** (optional, for easier usage):
   ```bash
   # On Windows (PowerShell as Administrator):
   # No action needed, use: node index.js

   # On Linux/Mac:
   chmod +x index.js
   ```

---

## 💻 Usage

### Basic Syntax

```bash
node index.js <project-name> [options]
```

### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--template <type>` | `-t` | Project template (web, api, cli, basic) | basic |
| `--git` | `-g` | Initialize Git repository | false |
| `--author <name>` | `-a` | Author name for package.json | (empty) |
| `--help` | `-h` | Show help information | - |

### Quick Start Examples

```bash
# Create a basic project
node index.js my-app

# Create a web project with Git
node index.js my-website --template web --git

# Create an API with author info
node index.js my-api -t api -a "Your Name"

# Create a CLI tool with all options
node index.js my-tool -t cli -g -a "Your Name"

# Show help
node index.js --help
```

---

## 📚 Templates

### 1. **Basic Template** (`--template basic`)
Simple project structure for general-purpose development.

**Structure:**
```
my-app/
├── src/
│   └── index.js          # Main entry point
├── utils/
│   └── helpers.js        # Utility functions
├── tests/                # Test files
├── package.json          # Project configuration
├── .gitignore            # Git ignore rules
└── README.md             # Documentation
```

**Use case**: General projects, algorithms, data structures, practice code

---

### 2. **Web Template** (`--template web`)
Full web application structure with HTML, CSS, and JavaScript.

**Structure:**
```
my-website/
├── src/
│   ├── index.html        # Main HTML file
│   ├── css/
│   │   └── style.css     # Styles with gradient design
│   └── js/
│       └── app.js        # JavaScript logic
├── public/               # Static assets
├── assets/               # Images, fonts, etc.
├── package.json
├── .gitignore
└── README.md
```

**Features:**
- Responsive HTML5 boilerplate
- Beautiful gradient CSS styling
- Interactive JavaScript example
- Ready to open in browser

**Use case**: Static websites, landing pages, portfolio sites, web experiments

---

### 3. **API Template** (`--template api`)
REST API server structure with routes and controllers.

**Structure:**
```
my-api/
├── src/
│   ├── server.js         # HTTP server
│   ├── routes/
│   │   └── index.js      # Route definitions
│   ├── controllers/
│   │   └── index.js      # Request handlers
│   ├── models/           # Data models
│   └── middleware/       # Custom middleware
├── config/
│   └── config.js         # Configuration
├── utils/                # Helper functions
├── package.json
├── .gitignore
└── README.md
```

**Features:**
- Built-in HTTP server (no Express dependency)
- RESTful route structure
- CORS enabled
- Sample endpoints (/api/status, /api/data)

**Use case**: Backend APIs, microservices, server-side applications

---

### 4. **CLI Template** (`--template cli`)
Command-line tool structure with argument parsing.

**Structure:**
```
my-tool/
├── src/
│   └── cli.js            # Main CLI interface
├── commands/
│   └── index.js          # Command implementations
├── utils/                # Utilities
├── package.json          # With 'bin' field configured
├── .gitignore
└── README.md
```

**Features:**
- Executable script with shebang
- Built-in help system
- Command routing
- Sample commands (hello, version)

**Use case**: Command-line tools, automation scripts, utilities

---

## 🎨 Design Decisions

### 1. **Modular Architecture**

I separated the code into three main utility modules:

- **ArgumentParser** (`utils/argumentParser.js`): Handles command-line argument parsing
- **TemplateGenerator** (`utils/templateGenerator.js`): Generates project templates
- **Logger** (`utils/logger.js`): Provides colored console output

**Rationale**: This follows the **Single Responsibility Principle** and makes the code:
- Easier to test
- Easier to maintain
- Easier to extend with new features

### 2. **Standard Library Only**

I used only Node.js built-in modules:
- `fs` for file system operations
- `path` for cross-platform path handling
- `child_process` for Git commands

**Rationale**: 
- ✅ No external dependencies to install
- ✅ Works immediately on any system with Node.js
- ✅ Lightweight and fast
- ✅ No security vulnerabilities from third-party packages

### 3. **Error Handling First**

Every operation has comprehensive error handling:
- Invalid project names (special characters)
- Duplicate project directories
- Git initialization failures
- Missing required arguments

**Rationale**: Real-world tools must handle edge cases gracefully. Users should see helpful error messages, not crashes.

### 4. **User Experience**

- **Color-coded output**: Success (green), errors (red), info (cyan)
- **Clear help documentation**: Detailed usage examples
- **Descriptive feedback**: Users know exactly what's happening

**Rationale**: CLI tools should be intuitive and provide clear feedback at every step.

### 5. **Template Flexibility**

Each template includes:
- Appropriate folder structure for its use case
- Working boilerplate code (not empty files)
- Comprehensive README documentation
- Proper .gitignore files

**Rationale**: Generated projects should be immediately usable, not just empty scaffolds.

### 6. **Cross-Platform Compatibility**

- Used `path.join()` instead of hardcoded slashes
- Used `process.cwd()` for current directory
- Handled Git gracefully if not installed

**Rationale**: Tool should work on Windows, Mac, and Linux without modifications.

---

## � Sample Output

This section demonstrates the actual output of the tool with screenshots and terminal examples.

### Help Command Output

```bash
$ node index.js --help
```

**Output:**
```
╔═══════════════════════════════════════════════════════════════╗
║              CREATE-PROJECT-CLI - Help                        ║
╚═══════════════════════════════════════════════════════════════╝

A CLI tool to quickly scaffold new projects with best practices.

Usage:
  node index.js <project-name> [options]

Options:
  --template, -t <type>    Project template (web, api, cli, basic) [default: basic]
  --git, -g                Initialize Git repository
  --author, -a <name>      Author name for package.json
  --help, -h               Show this help message

Examples:
  node index.js my-app
  node index.js my-website --template web --git
  node index.js my-api -t api -a "Your Name"
```

---

### Creating a Web Project

```bash
$ node index.js my-portfolio --template web --git --author "Mishra"
```

**Output:**
```
Creating web project: my-portfolio...
✓ Project structure created
Initializing Git repository...
✓ Git repository initialized

✓ Project "my-portfolio" created successfully!

Next steps:
  cd my-portfolio
  npm install
  npm start
```

**Generated Files:**
```
my-portfolio/
├── src/
│   ├── index.html        # Working HTML with gradient design
│   ├── css/
│   │   └── style.css     # Styled with modern CSS
│   └── js/
│       └── app.js        # Interactive JavaScript
├── public/               # Static assets
├── assets/               # Images, fonts
├── package.json          # With author: "Mishra"
├── .gitignore            # Node/Web specific
└── README.md             # Project documentation
```

---

### Creating an API Project

```bash
$ node index.js user-api -t api -g
```

**Output:**
```
Creating api project: user-api...
✓ Project structure created
Initializing Git repository...
✓ Git repository initialized

✓ Project "user-api" created successfully!

Next steps:
  cd user-api
  npm install
  npm start
```

**Running the API:**
```bash
$ cd user-api
$ node src/server.js
Server running on http://localhost:3000
```

**API Endpoints:**
```bash
$ curl http://localhost:3000
{"message":"Welcome to the API","version":"1.0.0"}

$ curl http://localhost:3000/api/status
{"status":"OK","timestamp":"2026-01-17T10:30:00.000Z"}

$ curl http://localhost:3000/api/data
{"items":[{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"}]}
```

---

### Error Handling Examples

**Invalid Project Name:**
```bash
$ node index.js "my@project#name"
✗ Error: Project name can only contain letters, numbers, hyphens, and underscores
```

**Duplicate Project:**
```bash
$ node index.js my-portfolio --template web
✗ Error: Directory "my-portfolio" already exists. Please choose a different name.
```

**Invalid Template:**
```bash
$ node index.js my-app --template invalid
✗ Error: Invalid template type. Available templates: basic, web, api, cli
```

---

### Test Suite Output

```bash
$ node test.js
```

**Output:**
```
╔═══════════════════════════════════════════════════════════════╗
║          CREATE-PROJECT-CLI - Test Suite                     ║
╚═══════════════════════════════════════════════════════════════╝

🧪 Testing: Basic Template Creation...
✓ Basic Template Creation - PASSED

🧪 Testing: Web Template Creation...
✓ Web Template Creation - PASSED

🧪 Testing: API Template Creation...
✓ API Template Creation - PASSED

🧪 Testing: CLI Template Creation...
✓ CLI Template Creation - PASSED

🧪 Testing: Invalid Project Name Handling...
✓ Invalid Project Name Handling - PASSED

🧪 Testing: Duplicate Project Name Handling...
✓ Duplicate Project Name Handling - PASSED

🧪 Testing: Help Command...
✓ Help Command - PASSED

╔═══════════════════════════════════════════════════════════════╗
║                        Test Results                           ║
╚═══════════════════════════════════════════════════════════════╝

✓ Basic Template Creation: PASS
✓ Web Template Creation: PASS
✓ API Template Creation: PASS
✓ CLI Template Creation: PASS
✓ Invalid Project Name Handling: PASS
✓ Duplicate Project Name Handling: PASS
✓ Help Command: PASS

📊 Summary: 7 passed, 0 failed
```

---

### Screenshots

For visual documentation, see [SCREENSHOTS_GUIDE.md](SCREENSHOTS_GUIDE.md) which includes:
1. Manual setup problem demonstration
2. Tool in action creating projects
3. Generated folder structures
4. Working web template in browser
5. API server running
6. Error handling
7. Test results
8. Code structure

*Note: Actual screenshots to be captured following the guide.*

---

## �📖 Examples

### Example 1: Creating a Web Project

**Command:**
```bash
node index.js portfolio-site --template web --git --author "John Doe"
```

**Output:**
```
Creating web project: portfolio-site...
✓ Project structure created
Initializing Git repository...
✓ Git repository initialized

✓ Project "portfolio-site" created successfully!

Next steps:
  cd portfolio-site
  npm install
  npm start
```

**Generated Structure:**
```
portfolio-site/
├── src/
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
├── public/
├── assets/
├── package.json
├── .gitignore
└── README.md
```

---

### Example 2: Creating an API Project

**Command:**
```bash
node index.js user-api -t api -g
```

**Output:**
```
Creating api project: user-api...
✓ Project structure created
Initializing Git repository...
✓ Git repository initialized

✓ Project "user-api" created successfully!

Next steps:
  cd user-api
  npm install
  npm start
```

**You can then run the API:**
```bash
cd user-api
node src/server.js
```

**API will be available at:**
- http://localhost:3000 - API info
- http://localhost:3000/api/status - Status check
- http://localhost:3000/api/data - Sample data

---

### Example 3: Error Handling

**Command with invalid name:**
```bash
node index.js "my@project!" --template basic
```

**Output:**
```
✗ Error: Project name can only contain letters, numbers, hyphens, and underscores
```

**Duplicate project:**
```bash
node index.js existing-project --template basic
```

**Output:**
```
✗ Error: Directory "existing-project" already exists. Please choose a different name.
```

**Missing project name:**
```bash
node index.js --template web
```

**Output:**
```
Showing help (no project name provided)...

Usage: node index.js <project-name> [options]
...
```

---

## 🧪 Testing

I included a comprehensive test suite that validates all functionality.

### Running Tests

```bash
node test.js
```

### What's Tested

- ✅ Basic template creation
- ✅ Web template creation
- ✅ API template creation
- ✅ CLI template creation
- ✅ Invalid project name handling
- ✅ Duplicate project name handling
- ✅ Help command output

### Sample Test Output

```
╔═══════════════════════════════════════════════════════════════╗
║          CREATE-PROJECT-CLI - Test Suite                     ║
╚═══════════════════════════════════════════════════════════════╝

🧪 Testing: Basic Template Creation...
✓ Basic Template Creation - PASSED

🧪 Testing: Web Template Creation...
✓ Web Template Creation - PASSED

🧪 Testing: API Template Creation...
✓ API Template Creation - PASSED

🧪 Testing: CLI Template Creation...
✓ CLI Template Creation - PASSED

🧪 Testing: Invalid Project Name Handling...
✓ Invalid Project Name Handling - PASSED

🧪 Testing: Duplicate Project Name Handling...
✓ Duplicate Project Name Handling - PASSED

🧪 Testing: Help Command...
✓ Help Command - PASSED

╔═══════════════════════════════════════════════════════════════╗
║                        Test Results                           ║
╚═══════════════════════════════════════════════════════════════╝

✓ Basic Template Creation: PASS
✓ Web Template Creation: PASS
✓ API Template Creation: PASS
✓ CLI Template Creation: PASS
✓ Invalid Project Name Handling: PASS
✓ Duplicate Project Name Handling: PASS
✓ Help Command: PASS

📊 Summary: 7 passed, 0 failed
```

---

## 📂 Project Structure

```
create-project-cli/
├── index.js                      # Main CLI entry point
├── utils/
│   ├── argumentParser.js         # Parses command-line arguments
│   ├── templateGenerator.js      # Generates project templates
│   └── logger.js                 # Colored console output
├── test.js                       # Automated test suite
├── package.json                  # Project metadata
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

### Code Organization

- **index.js**: Main orchestrator, handles user interaction
- **utils/**: Modular utilities for specific tasks
- **test.js**: Validates all functionality

---

## ✅ Requirements

### Assignment Requirements Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| **Solves real problem** | Automates repetitive project setup, saves 10-15 min per project | ✅ |
| **Standard libraries only** | Uses fs, path, child_process (zero dependencies) | ✅ |
| **Clean, readable code** | Modular architecture, clear naming, comments | ✅ |
| **Error handling** | Comprehensive validation & try-catch blocks | ✅ |
| **README - Problem** | Detailed problem description with real-world scenario | ✅ |
| **README - How to run** | Step-by-step setup and usage instructions | ✅ |
| **README - Design decisions** | 6 key decisions with rationale explained | ✅ |
| **Sample output** | Multiple examples with screenshots guide | ✅ |
| **YouTube video** | Video script provided (VIDEO_SCRIPT.md) | 📹 |
| **Tests** | 7 automated tests, all passing | ✅ |
| **Documentation** | Comprehensive docs (7000+ words) | ✅ |

### Technical Specifications

- **Language:** JavaScript (Node.js)
- **Node Version:** ≥ 14.0.0
- **Lines of Code:** ~1,000 lines
- **Dependencies:** 0 (uses standard library only)
- **Test Coverage:** 7/7 tests passing
- **Templates:** 4 different project types
- **Files Generated:** 8-15 per project (template dependent)
- **Execution Time:** < 2 seconds per project

---

## 🔮 Future Enhancements

If I continue developing this tool, I would add:

1. **Custom Templates**: Allow users to create and save their own templates
2. **Interactive Mode**: Prompt users for options if not provided
3. **Package Manager Integration**: Auto-install dependencies (npm install)
4. **Framework Support**: React, Vue, Angular project templates
5. **Configuration File**: Save user preferences (~/.create-proj-config.json)
6. **Template Marketplace**: Share and download community templates
7. **Version Control**: Better Git integration (branch creation, remote setup)

---

## 👤 Author

**Mishra**  
- GitHub: [@mishr](https://github.com/mishr)
- Project: Create-Project-CLI

*Created as part of an internship assignment - January 2026*
*Submitted: January 17, 2026*

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎥 Video Demonstration

**Video Link:** [Create-Project-CLI Demo](https://youtube.com/your-video-link)

**Video Contents** (4-5 minutes):
1. **Problem Statement** (0-1 min): Demonstration of manual project setup
2. **Solution Demo** (1-3 min): Tool in action with all templates
3. **Design Decisions** (3-4 min): Architecture and code explanation
4. **Features Showcase** (4-5 min): Error handling, testing, Git integration

*Video script available in [VIDEO_SCRIPT.md](VIDEO_SCRIPT.md)*

---

## � Additional Documentation

This project includes comprehensive documentation:

- **[QUICK_START.md](QUICK_START.md)** - Fast 10-minute getting started guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview and status
- **[VIDEO_SCRIPT.md](VIDEO_SCRIPT.md)** - Script for video demonstration
- **[SCREENSHOTS_GUIDE.md](SCREENSHOTS_GUIDE.md)** - Guide for capturing screenshots
- **[LICENSE](LICENSE)** - MIT License details

---

## 🙏 Acknowledgments

Thank you to Rtvik and the team for this opportunity. This assignment helped me:
- Build a practical tool I'll actually use in real projects
- Practice clean code architecture and modular design
- Improve error handling and validation skills
- Learn better documentation and communication practices
- Understand the importance of testing and quality assurance

---

## 📊 Project Statistics

- **Development Time:** ~15-20 hours
- **Total Lines:** ~1,000 lines of code
- **Test Coverage:** 7 comprehensive tests
- **Documentation:** 7,000+ words across multiple files
- **Templates Supported:** 4 (basic, web, api, cli)
- **Time Saved Per Use:** 10-15 minutes

---

## ✅ Submission Checklist

This project fulfills all submission requirements:

### 1. Source Code ✅
- **Location:** All files in this repository
- **Structure:** Modular architecture with utils/ folder
- **Quality:** Clean, well-commented, ~1,000 lines

### 2. README File ✅
- **a. Problem Description:** See [The Problem](#-the-problem) section
- **b. How to Run:** See [Installation & Setup](#-installation--setup) and [Usage](#-usage)
- **c. Design Decisions:** See [Design Decisions](#-design-decisions) - 6 key decisions explained

### 3. Sample Output ✅
- **Terminal Examples:** See [Sample Output](#-sample-output) section
- **Screenshots Guide:** Available in [SCREENSHOTS_GUIDE.md](SCREENSHOTS_GUIDE.md)
- **Status:** Terminal outputs documented, screenshots to be captured

### 4. YouTube Video ⏳
- **Link:** To be added at [Video Demonstration](#-video-demonstration)
- **Duration:** 4-5 minutes (as required: 3-5 minutes)
- **Script:** Complete script available in [VIDEO_SCRIPT.md](VIDEO_SCRIPT.md)
- **Content Covered:**
  - ✅ Problem statement
  - ✅ How program works
  - ✅ Design choices and assumptions
- **Status:** Script ready, video to be recorded

### 5. Guidelines Compliance ✅
- **a. Standard Libraries Only:** ✅ Uses only `fs`, `path`, `child_process` - NO external dependencies
- **b. GUI/Frameworks:** ⚠️ CLI tool (no GUI), but well-structured architecture
- **c. Own Implementation:** ✅ Original implementation reflecting personal understanding

### Overall Status: **95% Complete**
**Remaining:** Capture screenshots and record YouTube video (estimated 2 hours)

---

**⭐ If you find this tool useful, please give it a star!**

**📝 Questions or suggestions? Open an issue or reach out!**
