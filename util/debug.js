const colors = require('colors');
// const LOG_LEVEL = process.env.log_level

module.exports = Debugger;

/**
* The Constructor takes a filename so that we can reference said filename in our output.
*
* When importing the debug.js file, use this syntax:
* var logger = require('../path_to_here/debug')('local_filename');
* ...
* logger.info('This is an info statement.')
*/
function Debugger(filename, localLevel) {
  var fname = colors.cyan(filename + ":\t");

  return {
    debug,
    info,
    warn,
    error
  };

  function debug(str) {
    if (localLevel >= 4) {
      console.log(fname + str);
    }
  }

  function info(str) {
    if (localLevel >= 3) {
      console.log(fname + colors.green(str));
    }
  }

  function warn(str) {
    if (localLevel >= 2) {
      console.log(fname + colors.yellow(str));
    }
  }

  function error(str) {
    if (localLevel >= 1) {
      console.log(fname + '\n' + colors.red(str));
    }
  }
}
