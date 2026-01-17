/**
 * ArgumentParser
 * Parses command-line arguments and extracts configuration
 */

class ArgumentParser {
  /**
   * Parses command-line arguments into a configuration object
   * @param {Array} args - Command-line arguments
   * @returns {Object} Configuration object
   */
  parse(args) {
    const config = {
      projectName: '',
      template: 'basic',
      gitInit: false,
      author: ''
    };

    // First non-flag argument is the project name
    config.projectName = args.find(arg => !arg.startsWith('-'));

    if (!config.projectName) {
      throw new Error('Project name is required. Usage: create-proj <project-name> [options]');
    }

    // Parse flags
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case '--template':
        case '-t':
          if (!args[i + 1] || args[i + 1].startsWith('-')) {
            throw new Error('--template flag requires a value');
          }
          config.template = args[i + 1].toLowerCase();
          i++; // Skip next argument as it's the value
          break;

        case '--git':
        case '-g':
          config.gitInit = true;
          break;

        case '--author':
        case '-a':
          if (!args[i + 1] || args[i + 1].startsWith('-')) {
            throw new Error('--author flag requires a value');
          }
          config.author = args[i + 1];
          i++; // Skip next argument as it's the value
          break;
      }
    }

    return config;
  }
}

module.exports = ArgumentParser;
