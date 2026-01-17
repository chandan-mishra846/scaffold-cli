# create-project-cli

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

A lightweight CLI tool that automates project scaffolding. Create complete project structures with predefined templates in seconds.

## Problem Statement

Every time I start a new project for practice or assignments, I spend 10-15 minutes on repetitive setup tasks:
- Creating the same folder structure (`src/`, `utils/`, `tests/`)
- Writing boilerplate files (README.md, .gitignore, package.json)
- Setting up Git repositories
- Writing initial configuration code

This tool eliminates that overhead, letting me focus on actual development instead of project setup.

## Features

- **Zero Dependencies** - Uses only Node.js standard libraries (fs, path, child_process)
- **Multiple Templates** - Web, API, CLI, and basic project structures
- **Git Integration** - Optional automatic repository initialization
- **Smart Validation** - Prevents invalid project names and duplicates
- **Cross-Platform** - Works on Windows, macOS, and Linux
- **Fully Tested** - Comprehensive test suite included

## Installation

**Prerequisites:**
- Node.js 14.0.0 or higher
- Git (optional, for `--git` flag)

**Setup:**
```bash
git clone <your-repo-url>
cd create-project-cli
```

No additional dependencies to install. The tool uses only Node.js built-in modules.

## Usage

### Basic Command

```bash
node index.js <project-name> [options]
```

### Options

| Option | Shorthand | Description | Default |
|--------|-----------|-------------|---------|
| `--template <type>` | `-t` | Project template (web, api, cli, basic) | basic |
| `--git` | `-g` | Initialize Git repository | false |
| `--author <name>` | `-a` | Author name for package.json | - |
| `--help` | `-h` | Display help information | - |

### Examples

```bash
# Create a basic project
node index.js my-app

# Create a web project with Git initialization
node index.js my-website --template web --git

# Create an API with author information
node index.js my-api -t api -a "Your Name"

# Show help
node index.js --help
```

## Available Templates

### 1. Basic Template
General-purpose project structure for algorithms, practice code, and simple applications.

```
my-app/
├── src/
│   └── index.js
├── utils/
├── tests/
├── package.json
├── .gitignore
└── README.md
```

### 2. Web Template
Complete web application with HTML, CSS, and JavaScript.

```
my-website/
├── src/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── public/
├── assets/
├── package.json
└── README.md
```

### 3. API Template
REST API server structure with routes and controllers.

```
my-api/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── index.js
│   └── controllers/
│       └── index.js
├── config/
├── utils/
└── package.json
```

### 4. CLI Template
Command-line tool structure with proper organization.

```
my-tool/
├── src/
│   └── cli.js
├── commands/
│   └── index.js
├── utils/
└── package.json
```

## Design Decisions

### 1. Zero External Dependencies
The tool uses only Node.js standard libraries (fs, path, child_process) to ensure it works immediately without running `npm install`. This approach provides:
- Instant usability on any system with Node.js
- No dependency conflicts or security vulnerabilities
- Faster execution with smaller footprint

### 2. Modular Architecture
The codebase is organized into three focused modules:
- **argumentParser.js** - Handles command-line argument parsing and validation
- **templateGenerator.js** - Manages template creation and file generation
- **logger.js** - Provides colored console output for better UX

This separation makes the code easier to understand, test, and extend with new features.

### 3. Comprehensive Error Handling
The tool validates all inputs and handles edge cases gracefully:
- Invalid project names (special characters, reserved words)
- Duplicate project directories
- Git initialization failures
- Missing required arguments

Users receive clear, actionable error messages instead of crashes or stack traces.

### 4. Template-Based Approach
Different project types require different structures. Rather than a one-size-fits-all solution, the tool provides specialized templates that generate appropriate files and folders for each use case (web apps need HTML/CSS/JS, APIs need routes/controllers, etc.).

### 5. Git Integration
Version control is essential for most projects. The optional `--git` flag automatically initializes a repository and creates an initial commit, saving developers several manual steps.

### 6. Cross-Platform Compatibility
Using `path.join()` for file paths and checking for Git availability ensures the tool works consistently across Windows, macOS, and Linux environments.

## Sample Output

### Successful Project Creation

```bash
$ node index.js portfolio --template web --git

Creating web project: portfolio...
✓ Project structure created
Initializing Git repository...
✓ Git repository initialized

✓ Project "portfolio" created successfully!

Next steps:
  cd portfolio
  npm install
  npm start
```

### Error Handling

```bash
# Invalid project name
$ node index.js "my@project!"
✗ Error: Project name can only contain letters, numbers, hyphens, and underscores

# Duplicate project
$ node index.js portfolio --template web
✗ Error: Directory "portfolio" already exists. Please choose a different name.
```

## Testing

The project includes a comprehensive test suite covering all major functionality.

**Run tests:**
```bash
node test.js
```

**Test coverage:**
- Template creation for all types (basic, web, api, cli)
- Invalid project name validation
- Duplicate project detection
- Help command functionality

All tests pass successfully with clear output showing results for each test case.

## Project Structure

```
create-project-cli/
├── index.js                      # Main CLI entry point
├── utils/
│   ├── argumentParser.js         # Command-line argument parser
│   ├── templateGenerator.js      # Project template generator
│   └── logger.js                 # Colored console output
├── test.js                       # Automated test suite
├── package.json                  # Project metadata
├── .gitignore
└── README.md
```

## Assignment Requirements

This project fulfills the following requirements:

**1. Source Code**
- Complete implementation available in this repository
- Modular architecture with clear separation of concerns
- Approximately 1,000 lines of well-documented code

**2. README Documentation**
- **Problem Description:** Detailed in the [Problem Statement](#problem-statement) section
- **How to Run:** Complete instructions in [Installation](#installation) and [Usage](#usage)
- **Design Decisions:** Six key decisions explained in [Design Decisions](#design-decisions)

**3. Sample Output**
- Terminal examples provided in [Sample Output](#sample-output)
- Error handling demonstrations included

**4. Video Demonstration**
- YouTube link: [To be added]
- Duration: 4-5 minutes
- Content: Problem statement, program demonstration, design choices

**5. Technical Guidelines**
- ✓ Uses standard libraries only (fs, path, child_process)
- ✓ No external dependencies required
- ✓ Original implementation demonstrating understanding of concepts

## Future Enhancements

Potential improvements for future versions:
- Interactive mode with prompts for configuration
- User-defined custom templates
- Configuration file for saved preferences
- Support for popular frameworks (React, Vue, Angular)
- Automatic dependency installation
- Template marketplace for community sharing

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Author

Mishra | January 2026

Built as part of an internship assignment to demonstrate problem-solving skills and clean code practices.

---

**Note:** This tool is designed to save time on repetitive project setup tasks. Feel free to use, modify, and distribute according to the MIT License.
