# create-project-cli

A CLI tool to quickly scaffold new projects with predefined templates. Save 10+ minutes on every project setup!

## Why This Tool?

Stop wasting time creating the same folders and files for every new project. This tool automates project setup so you can start coding immediately.

## Features

- 🚀 **Zero Dependencies** - Uses only Node.js built-in modules
- 📦 **5 Templates** - Basic, Web, API, CLI, and Fullstack
- 🔧 **Git Ready** - Optional Git initialization
- ✅ **Smart Validation** - No duplicate or invalid project names

## Installation

```bash
git clone https://github.com/chandan-mishra846/scaffold-cli.git
cd scaffold-cli
```

**Requirements:** Node.js 14.0.0+

## Quick Start

```bash
# Basic project
node index.js my-project

# Web project with Git
node index.js my-website -t web -g

# API with author name
node index.js my-api -t api -a "Your Name"

# Fullstack project
node index.js my-fullstack -t fullstack
```

## Commands

| Command | Description |
|---------|-------------|
| `node index.js <name>` | Create basic project |
| `-t, --template <type>` | Choose template: basic, web, api, cli, fullstack |
| `-g, --git` | Initialize Git repository |
| `-a, --author <name>` | Set author name |
| `-h, --help` | Show help |

## Templates

**Basic** - Simple structure with src/, utils/, tests/  
**Web** - HTML/CSS/JS with organized folders  
**API** - REST API with routes and controllers  
**CLI** - Command-line tool structure  
**Fullstack** - Complete frontend + backend setup

## Example Output

```bash
$ node index.js portfolio -t web -g

Creating web project: portfolio...
✓ Project structure created
✓ Git repository initialized

✓ Project "portfolio" created successfully!

Next steps:
  cd portfolio
  npm install
  npm start
```

## Testing

```bash
npm test
```

## Project Structure

```
create-project-cli/
├── index.js                    # Main CLI
├── utils/
│   ├── argumentParser.js       # Parse commands
│   ├── templateGenerator.js    # Generate templates
│   └── logger.js               # Console output
├── test.js                     # Tests
└── package.json
```

## License

MIT License

## Author

Mishra | 2026
