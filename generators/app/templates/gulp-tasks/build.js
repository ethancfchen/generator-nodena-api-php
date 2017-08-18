const runSequence = require('run-sequence');

const setup = require('setup/setup');

runSequence.options.ignoreUndefinedTasks = true;

module.exports = function(taskCallback) {
  runSequence(
    'build:clean',
    'build:composer',
    'build:php',
    'build:copy',

    setup.browserSync ? 'browserSync' : null,
    setup.browserSync ? 'watch' : null,
    taskCallback
  );
};
