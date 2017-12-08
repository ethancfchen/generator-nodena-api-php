const gulp = require('gulp');
const gutil = require('gulp-util');
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
  gutil.log(chalk.green('Build Completed.'));
  taskDone();
});
