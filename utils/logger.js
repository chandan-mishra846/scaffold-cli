/**
 * Logger
 * Provides colored console output for better user experience
 */

class Logger {
  /**
   * Log informational messages (blue)
   */
  info(message) {
    console.log(`\x1b[36m${message}\x1b[0m`);
  }

  /**
   * Log success messages (green)
   */
  success(message) {
    console.log(`\x1b[32m${message}\x1b[0m`);
  }

  /**
   * Log error messages (red)
   */
  error(message) {
    console.error(`\x1b[31m${message}\x1b[0m`);
  }

  /**
   * Log warning messages (yellow)
   */
  warning(message) {
    console.log(`\x1b[33m${message}\x1b[0m`);
  }

  /**
   * Log plain messages (no color)
   */
  log(message) {
    console.log(message);
  }
}

module.exports = Logger;
