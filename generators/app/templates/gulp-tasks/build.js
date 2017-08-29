const runSequence = require('run-sequence');
const gutil = require('gulp-util');
const chalk = require('chalk');

const setup = require('setup/setup');

runSequence.options.ignoreUndefinedTasks = true;

module.exports = function() {
  runSequence(
    'build:clean',
    'build:composer',
    'build:php',
    'build:copy',

    setup.browserSync ? 'browserSync' : null,
    setup.browserSync ? 'watch' : null,

    () => gutil.log(chalk.green('Build Completed.'))
  );
};
