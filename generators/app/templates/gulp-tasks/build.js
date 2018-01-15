const gulp = require('gulp');
const log = require('fancy-log');
const chalk = require('chalk');
const config = require('config');

const tasks = [
  'build:clean',
  'build:composer',
  'build:php',
  'build:copy',

  config.localServer ? 'watch' : null,
  config.localServer ? 'browserSync' : null,
].filter((task) => Boolean(task));

module.exports = gulp.series(tasks, (taskDone) => {
  log(chalk.green('Build Completed.'));
  taskDone();
});
