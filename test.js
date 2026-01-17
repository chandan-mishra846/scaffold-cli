/**
 * Test Suite for create-project-cli
 * Run this to verify all functionality works correctly
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TestRunner {
  constructor() {
    this.testsPassed = 0;
    this.testsFailed = 0;
    this.testResults = [];
  }

  /**
   * Run a test and track results
   */
  runTest(name, testFn) {
    try {
      console.log(`\n🧪 Testing: ${name}...`);
      testFn();
      this.testsPassed++;
      this.testResults.push({ name, status: 'PASS' });
      console.log(`✓ ${name} - PASSED`);
    } catch (error) {
      this.testsFailed++;
      this.testResults.push({ name, status: 'FAIL', error: error.message });
      console.error(`✗ ${name} - FAILED: ${error.message}`);
    }
  }

  /**
   * Clean up test directories
   */
  cleanup() {
    const testDirs = ['test-basic-app', 'test-web-app', 'test-api-app', 'test-cli-app'];
    testDirs.forEach(dir => {
      const dirPath = path.join(process.cwd(), dir);
      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    });
  }

  /**
   * Assert that a condition is true
   */
  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  /**
   * Test: Basic template creation
   */
  testBasicTemplate() {
    execSync('node index.js test-basic-app --template basic', { stdio: 'ignore' });
    
    const projectPath = path.join(process.cwd(), 'test-basic-app');
    this.assert(fs.existsSync(projectPath), 'Project directory should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'src')), 'src directory should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'utils')), 'utils directory should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'package.json')), 'package.json should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'README.md')), 'README.md should exist');
    
    // Cleanup
    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  /**
   * Test: Web template creation
   */
  testWebTemplate() {
    execSync('node index.js test-web-app -t web', { stdio: 'ignore' });
    
    const projectPath = path.join(process.cwd(), 'test-web-app');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'index.html')), 'index.html should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'css', 'style.css')), 'style.css should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'js', 'app.js')), 'app.js should exist');
    
    // Cleanup
    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  /**
   * Test: API template creation
   */
  testApiTemplate() {
    execSync('node index.js test-api-app -t api', { stdio: 'ignore' });
    
    const projectPath = path.join(process.cwd(), 'test-api-app');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'server.js')), 'server.js should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'routes')), 'routes directory should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'controllers')), 'controllers directory should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'config')), 'config directory should exist');
    
    // Cleanup
    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  /**
   * Test: CLI template creation
   */
  testCliTemplate() {
    execSync('node index.js test-cli-app -t cli', { stdio: 'ignore' });
    
    const projectPath = path.join(process.cwd(), 'test-cli-app');
    this.assert(fs.existsSync(path.join(projectPath, 'src', 'cli.js')), 'cli.js should exist');
    this.assert(fs.existsSync(path.join(projectPath, 'commands')), 'commands directory should exist');
    
    // Cleanup
    fs.rmSync(projectPath, { recursive: true, force: true });
  }

  /**
   * Test: Invalid project name handling
   */
  testInvalidProjectName() {
    try {
      execSync('node index.js "test@invalid#name" --template basic', { stdio: 'ignore' });
      throw new Error('Should have failed with invalid project name');
    } catch (error) {
      // Expected to fail
      this.assert(error.status !== 0, 'Should exit with non-zero status for invalid name');
    }
  }

  /**
   * Test: Duplicate project name handling
   */
  testDuplicateProjectName() {
    execSync('node index.js test-duplicate-app --template basic', { stdio: 'ignore' });
    
    try {
      execSync('node index.js test-duplicate-app --template basic', { stdio: 'ignore' });
      throw new Error('Should have failed with duplicate project name');
    } catch (error) {
      // Expected to fail
      this.assert(error.status !== 0, 'Should exit with non-zero status for duplicate name');
    }
    
    // Cleanup
    const projectPath = path.join(process.cwd(), 'test-duplicate-app');
    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
  }

  /**
   * Test: Help command
   */
  testHelpCommand() {
    const output = execSync('node index.js --help').toString();
    this.assert(output.includes('USAGE'), 'Help should contain USAGE section');
    this.assert(output.includes('OPTIONS'), 'Help should contain OPTIONS section');
    this.assert(output.includes('EXAMPLES'), 'Help should contain EXAMPLES section');
  }

  /**
   * Run all tests
   */
  runAll() {
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║          CREATE-PROJECT-CLI - Test Suite                     ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');

    // Cleanup before tests
    this.cleanup();

    // Run tests
    this.runTest('Basic Template Creation', () => this.testBasicTemplate());
    this.runTest('Web Template Creation', () => this.testWebTemplate());
    this.runTest('API Template Creation', () => this.testApiTemplate());
    this.runTest('CLI Template Creation', () => this.testCliTemplate());
    this.runTest('Invalid Project Name Handling', () => this.testInvalidProjectName());
    this.runTest('Duplicate Project Name Handling', () => this.testDuplicateProjectName());
    this.runTest('Help Command', () => this.testHelpCommand());

    // Final cleanup
    this.cleanup();

    // Display results
    console.log('\n╔═══════════════════════════════════════════════════════════════╗');
    console.log('║                        Test Results                           ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');
    
    this.testResults.forEach(result => {
      const status = result.status === 'PASS' ? '✓' : '✗';
      console.log(`${status} ${result.name}: ${result.status}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
    });

    console.log(`\n📊 Summary: ${this.testsPassed} passed, ${this.testsFailed} failed\n`);

    if (this.testsFailed > 0) {
      process.exit(1);
    }
  }
}

// Run tests
const runner = new TestRunner();
runner.runAll();
