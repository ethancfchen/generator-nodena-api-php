const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');

const setup = require('setup/setup');

const tasks = [
  'build:clean',
  'build:composer',
  'build:php',
  'build:copy',

  setup.localServer ? 'watch' : null,
  setup.localServer ? 'browserSync' : null,
].filter((task) => Boolean(task));

module.exports = gulp.series(tasks, (taskDone) => {
  log(chalk.green('Build Completed.'));
  taskDone();
});
