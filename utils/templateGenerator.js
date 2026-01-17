/**
 * TemplateGenerator
 * Generates different project templates with appropriate folder structures
 */

const fs = require('fs');
const path = require('path');

class TemplateGenerator {
  /**
   * Generates a project based on the specified template
   * @param {string} projectPath - Path where project will be created
   * @param {string} template - Template type (web, api, cli, basic, fullstack)
   * @param {Object} options - Additional options (projectName, author)
   */
  generate(projectPath, template, options) {
    switch (template) {
      case 'web':
        this.generateWebTemplate(projectPath, options);
        break;
      case 'api':
        this.generateApiTemplate(projectPath, options);
        break;
      case 'cli':
        this.generateCliTemplate(projectPath, options);
        break;
      case 'fullstack':
        this.generateFullstackTemplate(projectPath, options);
        break;
      case 'basic':
      default:
        this.generateBasicTemplate(projectPath, options);
        break;
    }
  }

  /**
   * Creates a directory if it doesn't exist
   */
  createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Writes content to a file
   */
  writeFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  /**
   * Generates a basic project template
   */
  generateBasicTemplate(projectPath, options) {
    const { projectName, author } = options;

    // Create folders
    this.createDir(path.join(projectPath, 'src'));
    this.createDir(path.join(projectPath, 'utils'));
    this.createDir(path.join(projectPath, 'tests'));

    // Create main entry file
    this.writeFile(
      path.join(projectPath, 'src', 'index.js'),
      `// ${projectName}\n// Main entry point\n\nfunction main() {\n  console.log('Hello from ${projectName}!');\n}\n\nmain();\n`
    );

    // Create utility file
    this.writeFile(
      path.join(projectPath, 'utils', 'helpers.js'),
      `// Helper functions for ${projectName}\n\nfunction formatDate(date) {\n  return date.toLocaleDateString();\n}\n\nfunction capitalizeString(str) {\n  return str.charAt(0).toUpperCase() + str.slice(1);\n}\n\nmodule.exports = {\n  formatDate,\n  capitalizeString\n};\n`
    );

    // Create README
    this.writeFile(
      path.join(projectPath, 'README.md'),
      this.generateReadme(projectName, 'basic', author)
    );

    // Create .gitignore
    this.writeFile(
      path.join(projectPath, '.gitignore'),
      'node_modules/\n*.log\n.DS_Store\n.env\n'
    );

    // Create package.json
    this.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify({
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - A basic project`,
        main: 'src/index.js',
        scripts: {
          start: 'node src/index.js',
          test: 'echo "Error: no test specified" && exit 1'
        },
        keywords: [],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );
  }

  /**
   * Generates a web project template
   */
  generateWebTemplate(projectPath, options) {
    const { projectName, author } = options;

    // Create folders
    this.createDir(path.join(projectPath, 'src'));
    this.createDir(path.join(projectPath, 'src', 'css'));
    this.createDir(path.join(projectPath, 'src', 'js'));
    this.createDir(path.join(projectPath, 'public'));
    this.createDir(path.join(projectPath, 'assets'));

    // Create HTML file
    this.writeFile(
      path.join(projectPath, 'src', 'index.html'),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Welcome to ${projectName}</h1>
    </header>
    <main>
      <p>Your web project is ready to go!</p>
      <button id="actionBtn">Click Me</button>
    </main>
    <footer>
      <p>&copy; 2026 ${author || 'Your Name'}. All rights reserved.</p>
    </footer>
  </div>
  <script src="js/app.js"></script>
</body>
</html>
`
    );

    // Create CSS file
    this.writeFile(
      path.join(projectPath, 'src', 'css', 'style.css'),
      `/* ${projectName} Styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 90%;
}

header h1 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

main {
  padding: 2rem 0;
  text-align: center;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
}

button:hover {
  background: #764ba2;
}

footer {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 2rem;
}
`
    );

    // Create JavaScript file
    this.writeFile(
      path.join(projectPath, 'src', 'js', 'app.js'),
      `// ${projectName} - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('actionBtn');
  
  btn.addEventListener('click', () => {
    alert('Hello from ${projectName}! 🚀');
  });

  console.log('${projectName} loaded successfully!');
});
`
    );

    // Create README
    this.writeFile(
      path.join(projectPath, 'README.md'),
      this.generateReadme(projectName, 'web', author)
    );

    // Create .gitignore
    this.writeFile(
      path.join(projectPath, '.gitignore'),
      'node_modules/\n*.log\n.DS_Store\ndist/\nbuild/\n'
    );

    // Create package.json
    this.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify({
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - A web application`,
        main: 'src/index.html',
        scripts: {
          start: 'echo "Open src/index.html in your browser"'
        },
        keywords: ['web', 'html', 'css', 'javascript'],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );
  }

  /**
   * Generates an API project template
   */
  generateApiTemplate(projectPath, options) {
    const { projectName, author } = options;

    // Create folders
    this.createDir(path.join(projectPath, 'src'));
    this.createDir(path.join(projectPath, 'src', 'routes'));
    this.createDir(path.join(projectPath, 'src', 'controllers'));
    this.createDir(path.join(projectPath, 'src', 'models'));
    this.createDir(path.join(projectPath, 'src', 'middleware'));
    this.createDir(path.join(projectPath, 'utils'));
    this.createDir(path.join(projectPath, 'config'));

    // Create main server file
    this.writeFile(
      path.join(projectPath, 'src', 'server.js'),
      `// ${projectName} - API Server
const http = require('http');
const url = require('url');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Content-Type', 'application/json');

  // Route handling
  routes.handleRequest(path, method, req, res);
});

server.listen(PORT, () => {
  console.log(\`🚀 ${projectName} API server running on http://localhost:\${PORT}\`);
});
`
    );

    // Create routes file
    this.writeFile(
      path.join(projectPath, 'src', 'routes', 'index.js'),
      `// Routes handler
const controllers = require('../controllers');

function handleRequest(path, method, req, res) {
  // API root
  if (path === '/' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Welcome to the API',
      version: '1.0.0',
      endpoints: {
        '/api/status': 'GET - Check API status',
        '/api/data': 'GET - Get data'
      }
    }));
    return;
  }

  // Status endpoint
  if (path === '/api/status' && method === 'GET') {
    controllers.getStatus(req, res);
    return;
  }

  // Data endpoint
  if (path === '/api/data' && method === 'GET') {
    controllers.getData(req, res);
    return;
  }

  // 404 Not Found
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Route not found' }));
}

module.exports = { handleRequest };
`
    );

    // Create controllers
    this.writeFile(
      path.join(projectPath, 'src', 'controllers', 'index.js'),
      `// Controllers for API endpoints

function getStatus(req, res) {
  res.writeHead(200);
  res.end(JSON.stringify({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }));
}

function getData(req, res) {
  const sampleData = {
    items: [
      { id: 1, name: 'Item 1', value: 100 },
      { id: 2, name: 'Item 2', value: 200 },
      { id: 3, name: 'Item 3', value: 300 }
    ],
    total: 3
  };

  res.writeHead(200);
  res.end(JSON.stringify(sampleData));
}

module.exports = {
  getStatus,
  getData
};
`
    );

    // Create config file
    this.writeFile(
      path.join(projectPath, 'config', 'config.js'),
      `// Configuration settings
module.exports = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  apiVersion: '1.0.0'
};
`
    );

    // Create README
    this.writeFile(
      path.join(projectPath, 'README.md'),
      this.generateReadme(projectName, 'api', author)
    );

    // Create .gitignore
    this.writeFile(
      path.join(projectPath, '.gitignore'),
      'node_modules/\n*.log\n.DS_Store\n.env\n'
    );

    // Create package.json
    this.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify({
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - REST API`,
        main: 'src/server.js',
        scripts: {
          start: 'node src/server.js',
          dev: 'node src/server.js'
        },
        keywords: ['api', 'rest', 'backend'],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );
  }

  /**
   * Generates a CLI project template
   */
  generateCliTemplate(projectPath, options) {
    const { projectName, author } = options;

    // Create folders
    this.createDir(path.join(projectPath, 'src'));
    this.createDir(path.join(projectPath, 'utils'));
    this.createDir(path.join(projectPath, 'commands'));

    // Create main CLI file
    this.writeFile(
      path.join(projectPath, 'src', 'cli.js'),
      `#!/usr/bin/env node
// ${projectName} - CLI Tool

const commands = require('../commands');

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const command = args[0];

  switch (command) {
    case 'hello':
      commands.hello(args.slice(1));
      break;
    case 'version':
      commands.version();
      break;
    default:
      console.error(\`Unknown command: \${command}\`);
      console.log('Use --help to see available commands');
      process.exit(1);
  }
}

function showHelp() {
  console.log(\`
╔════════════════════════════════════════╗
║         ${projectName.toUpperCase()}                ║
╚════════════════════════════════════════╝

USAGE:
  ${projectName} <command> [options]

COMMANDS:
  hello [name]    Say hello to someone
  version         Show version information
  --help, -h      Show this help message

EXAMPLES:
  ${projectName} hello John
  ${projectName} version
  \`);
}

main();
`
    );

    // Create commands
    this.writeFile(
      path.join(projectPath, 'commands', 'index.js'),
      `// Command implementations

function hello(args) {
  const name = args[0] || 'World';
  console.log(\`Hello, \${name}! 👋\`);
}

function version() {
  const pkg = require('../package.json');
  console.log(\`\${pkg.name} v\${pkg.version}\`);
}

module.exports = {
  hello,
  version
};
`
    );

    // Create README
    this.writeFile(
      path.join(projectPath, 'README.md'),
      this.generateReadme(projectName, 'cli', author)
    );

    // Create .gitignore
    this.writeFile(
      path.join(projectPath, '.gitignore'),
      'node_modules/\n*.log\n.DS_Store\n'
    );

    // Create package.json
    this.writeFile(
      path.join(projectPath, 'package.json'),
      JSON.stringify({
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - Command-line tool`,
        main: 'src/cli.js',
        bin: {
          [projectName]: './src/cli.js'
        },
        scripts: {
          start: 'node src/cli.js'
        },
        keywords: ['cli', 'command-line', 'tool'],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );
  }

  /**
   * Generates a full-stack project template with Frontend and Backend
   */
  generateFullstackTemplate(projectPath, options) {
    const { projectName, author } = options;

    // ============ FRONTEND STRUCTURE ============
    
    // Create frontend folders
    this.createDir(path.join(projectPath, 'frontend'));
    this.createDir(path.join(projectPath, 'frontend', 'src'));
    this.createDir(path.join(projectPath, 'frontend', 'src', 'components'));
    this.createDir(path.join(projectPath, 'frontend', 'src', 'pages'));
    this.createDir(path.join(projectPath, 'frontend', 'src', 'styles'));
    this.createDir(path.join(projectPath, 'frontend', 'src', 'services'));
    this.createDir(path.join(projectPath, 'frontend', 'public'));

    // Frontend: Main App.js
    this.writeFile(
      path.join(projectPath, 'frontend', 'src', 'App.js'),
      `// ${projectName} - Frontend App
import { fetchUsers, createUser } from './services/api.js';

class App {
  constructor() {
    this.apiUrl = 'http://localhost:5000';
    this.init();
  }

  async init() {
    console.log('${projectName} Frontend Loaded!');
    this.setupEventListeners();
    await this.loadUsers();
  }

  setupEventListeners() {
    const form = document.getElementById('userForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.loadUsers());
    }
  }

  async loadUsers() {
    try {
      const users = await fetchUsers();
      this.displayUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
      document.getElementById('userList').innerHTML = 
        '<p class="error">Failed to load users. Is backend running?</p>';
    }
  }

  displayUsers(users) {
    const userList = document.getElementById('userList');
    if (users.length === 0) {
      userList.innerHTML = '<p>No users found. Add one below!</p>';
      return;
    }

    userList.innerHTML = users.map(user => \`
      <div class="user-card">
        <h3>\${user.name}</h3>
        <p>\${user.email}</p>
        <small>ID: \${user.id}</small>
      </div>
    \`).join('');
  }

  async handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
      await createUser({ name, email });
      e.target.reset();
      await this.loadUsers();
      alert('User added successfully!');
    } catch (error) {
      alert('Failed to add user: ' + error.message);
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
`
    );

    // Frontend: API Service
    this.writeFile(
      path.join(projectPath, 'frontend', 'src', 'services', 'api.js'),
      `// API Service - Connects to Backend
const API_URL = 'http://localhost:5000/api';

export async function fetchUsers() {
  const response = await fetch(\`\${API_URL}/users\`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch(\`\${API_URL}/users\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(\`\${API_URL}/users/\${id}\`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
}
`
    );

    // Frontend: Header Component
    this.writeFile(
      path.join(projectPath, 'frontend', 'src', 'components', 'Header.js'),
      `// Header Component
export function createHeader() {
  return \`
    <header class="header">
      <h1>${projectName}</h1>
      <p>Full-Stack Application Demo</p>
    </header>
  \`;
}
`
    );

    // Frontend: User List Page
    this.writeFile(
      path.join(projectPath, 'frontend', 'src', 'pages', 'UsersPage.js'),
      `// Users Page Component
export function createUsersPage() {
  return \`
    <div class="page">
      <h2>User Management</h2>
      <button id="refreshBtn" class="btn btn-secondary">Refresh Users</button>
      
      <div id="userList" class="user-list">
        <p>Loading users...</p>
      </div>

      <div class="form-section">
        <h3>Add New User</h3>
        <form id="userForm">
          <input type="text" id="name" placeholder="Name" required />
          <input type="email" id="email" placeholder="Email" required />
          <button type="submit" class="btn btn-primary">Add User</button>
        </form>
      </div>
    </div>
  \`;
}
`
    );

    // Frontend: Main HTML
    this.writeFile(
      path.join(projectPath, 'frontend', 'public', 'index.html'),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName} - Full-Stack App</title>
  <link rel="stylesheet" href="../src/styles/main.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>${projectName}</h1>
      <p>Full-Stack Application</p>
      <small>Frontend + Backend Connected</small>
    </header>

    <main>
      <section class="status">
        <h2>Connection Status</h2>
        <p id="status">Checking backend connection...</p>
      </section>

      <section class="users">
        <div class="section-header">
          <h2>Users</h2>
          <button id="refreshBtn" class="btn btn-secondary">🔄 Refresh</button>
        </div>
        <div id="userList" class="user-list">
          <p>Loading users...</p>
        </div>
      </section>

      <section class="form-section">
        <h2>Add New User</h2>
        <form id="userForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter email" required />
          </div>
          <button type="submit" class="btn btn-primary">Add User</button>
        </form>
      </section>
    </main>

    <footer>
      <p>Created with create-project-cli | Backend: Node.js | Frontend: Vanilla JS</p>
    </footer>
  </div>

  <script type="module" src="../src/App.js"></script>
</body>
</html>
`
    );

    // Frontend: CSS
    this.writeFile(
      path.join(projectPath, 'frontend', 'src', 'styles', 'main.css'),
      `/* ${projectName} - Main Styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

header small {
  display: block;
  margin-top: 10px;
  opacity: 0.8;
}

main {
  padding: 30px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.status p {
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  border-left: 4px solid #667eea;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.user-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-card h3 {
  color: #667eea;
  margin-bottom: 8px;
}

.user-card p {
  color: #666;
  margin-bottom: 5px;
}

.user-card small {
  color: #999;
  font-size: 0.85rem;
}

.form-section {
  background: #fff;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.error {
  color: #dc3545;
  padding: 15px;
  background: #f8d7da;
  border-radius: 5px;
}

footer {
  background: #f8f9fa;
  padding: 20px;
  text-align: center;
  color: #666;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .user-list {
    grid-template-columns: 1fr;
  }
  
  header h1 {
    font-size: 2rem;
  }
}
`
    );

    // Frontend: Dev Server
    this.writeFile(
      path.join(projectPath, 'frontend', 'server.js'),
      `// Frontend Development Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/public/index.html' : req.url;
  
  // Remove query strings
  filePath = filePath.split('?')[0];
  
  // Build full file path
  let fullPath = path.join(__dirname, filePath);
  
  // Check if file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }

    // Get file extension
    const extname = String(path.extname(fullPath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(fullPath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end('500 Internal Server Error: ' + error.code);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(\`\\n🎨 ${projectName} Frontend Server Started!\`);
  console.log(\`📱 Frontend running on http://localhost:\${PORT}\`);
  console.log(\`\\n✅ Open http://localhost:\${PORT} in your browser!\\n\`);
});
`
    );

    // Frontend: package.json
    this.writeFile(
      path.join(projectPath, 'frontend', 'package.json'),
      JSON.stringify({
        name: `${projectName}-frontend`,
        version: '1.0.0',
        description: `${projectName} - Frontend Application`,
        main: 'server.js',
        scripts: {
          dev: 'node server.js',
          start: 'node server.js'
        },
        keywords: ['frontend', 'fullstack'],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );

    // ============ BACKEND STRUCTURE ============

    // Create backend folders (flat structure - no src/)
    this.createDir(path.join(projectPath, 'backend'));
    this.createDir(path.join(projectPath, 'backend', 'routes'));
    this.createDir(path.join(projectPath, 'backend', 'controllers'));
    this.createDir(path.join(projectPath, 'backend', 'models'));
    this.createDir(path.join(projectPath, 'backend', 'middleware'));
    this.createDir(path.join(projectPath, 'backend', 'config'));

    // Backend: Main Server
    this.writeFile(
      path.join(projectPath, 'backend', 'server.js'),
      `// ${projectName} - Backend Server
const http = require('http');
const url = require('url');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // CORS headers (allow frontend to connect)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Route handling
  routes.handleRequest(path, method, req, res, parsedUrl.query);
});

server.listen(PORT, () => {
  console.log(\`\\n🚀 ${projectName} Backend Server Started!\`);
  console.log(\`📡 Server running on http://localhost:\${PORT}\`);
  console.log(\`📋 API Endpoints:\`);
  console.log(\`   GET    http://localhost:\${PORT}/api/users\`);
  console.log(\`   POST   http://localhost:\${PORT}/api/users\`);
  console.log(\`   GET    http://localhost:\${PORT}/api/status\`);
  console.log(\`\\n✅ Ready to receive requests from frontend!\\n\`);
});
`
    );

    // Backend: Routes
    this.writeFile(
      path.join(projectPath, 'backend', 'routes', 'index.js'),
      `// Routes Handler
const userController = require('../controllers/userController');

function handleRequest(path, method, req, res, query) {
  // Root endpoint
  if (path === '/' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'Backend API is running',
      version: '1.0.0',
      endpoints: {
        'GET /api/status': 'Check API status',
        'GET /api/users': 'Get all users',
        'POST /api/users': 'Create new user'
      }
    }));
    return;
  }

  // Status endpoint
  if (path === '/api/status' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      message: 'Backend is connected!',
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // User routes
  if (path === '/api/users' && method === 'GET') {
    userController.getUsers(req, res);
    return;
  }

  if (path === '/api/users' && method === 'POST') {
    userController.createUser(req, res);
    return;
  }

  if (path.startsWith('/api/users/') && method === 'DELETE') {
    const id = path.split('/')[3];
    userController.deleteUser(req, res, id);
    return;
  }

  // 404 Not Found
  res.writeHead(404);
  res.end(JSON.stringify({ 
    error: 'Route not found',
    path: path,
    method: method
  }));
}

module.exports = { handleRequest };
`
    );

    // Backend: User Controller
    this.writeFile(
      path.join(projectPath, 'backend', 'controllers', 'userController.js'),
      `// User Controller - Handles user operations
const User = require('../models/User');

// Get all users
function getUsers(req, res) {
  try {
    const users = User.getAll();
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
}

// Create new user
function createUser(req, res) {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);
      
      // Validation
      if (!userData.name || !userData.email) {
        res.writeHead(400);
        res.end(JSON.stringify({ 
          error: 'Name and email are required' 
        }));
        return;
      }

      const newUser = User.create(userData);
      res.writeHead(201);
      res.end(JSON.stringify({
        message: 'User created successfully',
        user: newUser
      }));
    } catch (error) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: error.message }));
    }
  });
}

// Delete user
function deleteUser(req, res, id) {
  try {
    User.delete(id);
    res.writeHead(200);
    res.end(JSON.stringify({ 
      message: 'User deleted successfully',
      id: id
    }));
  } catch (error) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: error.message }));
  }
}

module.exports = {
  getUsers,
  createUser,
  deleteUser
};
`
    );

    // Backend: User Model (In-Memory Database)
    this.writeFile(
      path.join(projectPath, 'backend', 'models', 'User.js'),
      `// User Model - In-Memory Database
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
];

let nextId = 4;

class User {
  static getAll() {
    return users;
  }

  static getById(id) {
    return users.find(user => user.id === parseInt(id));
  }

  static create(userData) {
    const newUser = {
      id: nextId++,
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  }

  static delete(id) {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    return true;
  }

  static update(id, userData) {
    const user = this.getById(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, userData);
    return user;
  }
}

module.exports = User;
`
    );

    // Backend: Database Config
    this.writeFile(
      path.join(projectPath, 'backend', 'config', 'db.js'),
      `// Database Configuration
// Currently using in-memory storage
// Replace this with real database connection (MongoDB, PostgreSQL, etc.)

const dbConfig = {
  type: 'in-memory',
  name: '${projectName}-db',
  version: '1.0.0'
};

// Example MongoDB connection (commented out)
/*
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/${projectName}', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
*/

module.exports = dbConfig;
`
    );

    // Backend: .env
    this.writeFile(
      path.join(projectPath, 'backend', '.env'),
      `# Backend Environment Variables
PORT=5000
NODE_ENV=development

# Database (example)
# MONGODB_URI=mongodb://localhost:27017/${projectName}
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=${projectName}

# API Keys (example)
# JWT_SECRET=your-secret-key-here
# API_KEY=your-api-key-here
`
    );

    // Backend: package.json
    this.writeFile(
      path.join(projectPath, 'backend', 'package.json'),
      JSON.stringify({
        name: `${projectName}-backend`,
        version: '1.0.0',
        description: `${projectName} - Backend API`,
        main: 'server.js',
        scripts: {
          dev: 'node server.js',
          start: 'node server.js'
        },
        keywords: ['backend', 'api', 'fullstack'],
        author: author || '',
        license: 'MIT'
      }, null, 2)
    );

    // ============ ROOT FILES ============

    // Root: README
    this.writeFile(
      path.join(projectPath, 'README.md'),
      `# ${projectName}

A full-stack application with React-style frontend and Node.js backend.

## Project Structure

\`\`\`
${projectName}/
├── frontend/              # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS styles
│   │   ├── services/      # API services
│   │   └── App.js         # Main app logic
│   └── public/
│       └── index.html     # Main HTML file
│
├── backend/               # Backend API
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── models/            # Data models
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   ├── server.js          # Main server
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
└── README.md
\`\`\`

## Getting Started

### 1. Start the Backend

\`\`\`bash
cd backend
npm run dev
\`\`\`

Backend will run on: **http://localhost:5000**

### 2. Start the Frontend (in a new terminal)

\`\`\`bash
cd frontend
npm run dev
\`\`\`

Frontend will run on: **http://localhost:3000**

### 3. Access the Application

Open your browser and go to: **http://localhost:3000**

## Features

### Frontend:
- ✅ User Management Interface
- ✅ API Integration
- ✅ Responsive Design
- ✅ Modern UI with Gradient Styling
- ✅ Component-based Architecture

### Backend:
- ✅ RESTful API
- ✅ User CRUD Operations
- ✅ CORS Enabled
- ✅ In-Memory Database (easily replaceable)
- ✅ Modular Structure

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| POST | /api/users | Create new user |
| DELETE | /api/users/:id | Delete user |
| GET | /api/status | Check API status |

## How to Use

1. **Start Backend**: 
   \`\`\`bash
   cd backend
   npm run dev
   \`\`\`

2. **Start Frontend** (in new terminal):
   \`\`\`bash
   cd frontend
   npm run dev
   \`\`\`

3. **Open Browser**: Go to http://localhost:3000
4. **Test Connection**: Check if users load automatically
5. **Add Users**: Fill the form and submit
6. **Refresh**: Click refresh button to reload users

## Technologies Used

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js (standard libraries only)
- **Database**: In-memory (can be replaced with MongoDB, PostgreSQL, etc.)

## Future Enhancements

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Add authentication (JWT)
- [ ] Add user edit functionality
- [ ] Add pagination
- [ ] Add search/filter
- [ ] Deploy to cloud

## Author

${author || 'Your Name'}

## License

MIT License

---

*Generated with create-project-cli*
`
    );

    // Root: .gitignore
    this.writeFile(
      path.join(projectPath, '.gitignore'),
      `# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
dist/
build/
`
    );
  }

  /**
   * Generates a README file for the project
   */
  generateReadme(projectName, template, author) {
    const templateDescriptions = {
      basic: 'A simple project structure with source code and utilities.',
      web: 'A web application with HTML, CSS, and JavaScript.',
      api: 'A REST API server with routes and controllers.',
      cli: 'A command-line tool for terminal usage.',
      fullstack: 'A full-stack application with React frontend and Node.js backend.'
    };

    const runInstructions = {
      basic: '```bash\nnode src/index.js\n```',
      web: '```bash\n# Open sTerminal 1 - Start Backend\ncd backend\nnpm run dev\n\n# Terminal 2 - Start Frontend\ncd frontend\nnpm run dev\n\n# Open http://localhost:3000/src/\n```',
      api: '```bash\nnode src/server.js\n# API will be available at http://localhost:3000\n```',
      cli: '```bash\nnode src/cli.js --help\n```',
      fullstack: '```bash\n# Start Backend\ncd backend\nnode server.js\n\n# In another terminal, start Frontend\ncd frontend\nopen public/index.html in browser\n```'
    };

    return `# ${projectName}

${templateDescriptions[template]}

## Project Structure

\`\`\`
${this.getProjectStructure(template)}
\`\`\`

## Getting Started

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Navigate to the project directory:
   \`\`\`bash
   cd ${projectName}
   \`\`\`

2. Install dependencies (if any):
   \`\`\`bash
   npm install
   \`\`\`

### Running the Project

${runInstructions[template]}

## Features

- Clean and organized project structure
- Standard libraries only (no external dependencies required)
- Ready-to-use boilerplate code
- Comprehensive comments and documentation

## Author

${author || 'Your Name'}

## License

This project is licensed under the MIT License.

## Generated By

This project was scaffolded using [create-project-cli](https://github.com/yourusername/create-project-cli) - A tool to quickly generate project structures.

---

*Created on ${new Date().toLocaleDateString()}*
`;
  }

  /**
   * Returns the project structure based on template
   */
  getProjectStructure(template) {
    const structures = {
      basic: `${template}-project/
├── src/
│   └── index.js
├── utils/
│   └── helpers.js
├── tests/
├── package.json
├── .gitignore
└── README.md`,
      web: `${template}-project/
├── src/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── public/
├── assets/
├── package.json
├── .gitignore
└── README.md`,
      api: `${template}-project/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── index.js
│   ├── controllers/
│   │   └── index.js
│   ├── models/
│   └── middleware/
├── config/
│   └── config.js
├── utils/
├── package.json
├── .gitignore
└── README.md`,
      cli: `${template}-project/
├── src/
│   └── cli.js
├── commands/
│   └── index.js
├── utils/
├── package.json
├── .gitignore
└── README.md`,
      fullstack: `${template}-project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── .env
│   └── package.json
└── README.md`
    };

    return structures[template] || structures.basic;
  }
}

module.exports = TemplateGenerator;
