
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ArgumentParser = require('./utils/argumentParser');
const TemplateGenerator = require('./utils/templateGenerator');
const Logger = require('./utils/logger');

class ProjectCLI {
  constructor() {
    this.logger = new Logger();
    this.parser = new ArgumentParser();
    this.generator = new TemplateGenerator();
  }

  
  run() {
    try {
      const args = process.argv.slice(2);

      // Show help if no arguments provided
      if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
        this.showHelp();
        return;
      }

      // Parse command-line arguments
      const config = this.parser.parse(args);

      // Validate configuration
      this.validateConfig(config);

      // Create the project
      this.createProject(config);

      this.logger.success(`\n✓ Project "${config.projectName}" created successfully!`);
      this.logger.info(`\nNext steps:`);
      this.logger.info(`  cd ${config.projectName}`);
      
      if (config.template === 'web' || config.template === 'api') {
        this.logger.info(`  npm install`);
        this.logger.info(`  npm start`);
      } else {
        this.logger.info(`  Start coding!`);
      }

    } catch (error) {
      this.logger.error(`\n✗ Error: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * Validates the configuration before creating a project
   */
  validateConfig(config) {
    const { projectName, template } = config;

    // Check if project name is valid (no special characters except hyphens and underscores)
    const nameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!nameRegex.test(projectName)) {
      throw new Error('Project name can only contain letters, numbers, hyphens, and underscores');
    }

    // Check if directory already exists
    const projectPath = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) {
      throw new Error(`Directory "${projectName}" already exists. Please choose a different name.`);
    }

    // Validate template type
    const validTemplates = ['web', 'api', 'cli', 'basic', 'fullstack'];
    if (!validTemplates.includes(template)) {
      throw new Error(`Invalid template "${template}". Valid templates: ${validTemplates.join(', ')}`);
    }
  }

  /**
   * Creates the project with the specified configuration
   */
  createProject(config) {
    const { projectName, template, gitInit, author } = config;
    const projectPath = path.join(process.cwd(), projectName);

    this.logger.info(`\nCreating ${template} project: ${projectName}...`);

    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });

    // Generate template-specific structure
    this.generator.generate(projectPath, template, { projectName, author });

    // Initialize Git repository if requested
    if (gitInit) {
      this.initGit(projectPath, projectName);
    }

    this.logger.success(`✓ Project structure created`);
  }

  /**
   * Initializes a Git repository
   */
  initGit(projectPath, projectName) {
    try {
      this.logger.info('Initializing Git repository...');
      
      const originalCwd = process.cwd();
      process.chdir(projectPath);
      
      execSync('git init', { stdio: 'ignore' });
      execSync('git add .', { stdio: 'ignore' });
      execSync('git commit -m "Initial commit: Project scaffolded by create-project-cli"', { stdio: 'ignore' });
      
      process.chdir(originalCwd);
      
      this.logger.success('✓ Git repository initialized');
    } catch (error) {
      this.logger.warning('⚠ Git initialization failed. Make sure Git is installed.');
    }
  }

  /**
   * Displays help information
   */
  showHelp() {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║               CREATE-PROJECT-CLI v1.0.0                       ║
║  Quickly scaffold new projects with pre-configured templates  ║
╚═══════════════════════════════════════════════════════════════╝

USAGE:
  create-proj <project-name> [options]

OPTIONS:
  --template, -t <type>    Project template type (default: basic)
                           Options: web, api, cli, basic, fullstack
  
  --git, -g                Initialize Git repository
  
  --author, -a <name>      Author name for package.json
  
  --help, -h               Show this help message

EXAMPLES:
  # Create a basic project
  create-proj my-app

  # Create a web project with Git initialization
  create-proj my-website --template web --git

  # Create an API project with author info
  create-proj my-api -t api -g -a "John Doe"

TEMPLATES:
  basic     - Simple project with src/, utils/, and README
  web       - Web project with HTML/CSS/JS structure
  api       - REST API project structure with routes/controllers
  cli       - Command-line tool structure
  fullstack - Full-stack app with React frontend & Node.js backend

PROBLEM SOLVED:
  Eliminates the repetitive task of manually creating folder structures,
  configuration files, and boilerplate code for new projects.

REPOSITORY:
  https://github.com/yourusername/create-project-cli
    `);
  }
}

// Run the CLI
const cli = new ProjectCLI();
cli.run();
