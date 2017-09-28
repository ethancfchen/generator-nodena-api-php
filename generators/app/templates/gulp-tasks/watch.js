const gulp = require('gulp');

const setup = require('setup/setup');

module.exports = function(taskDone) {
  const assets = setup.assets;

  const watches = assets.watch;

  gulp.watch(watches.php, gulp.parallel('build:php'));

  taskDone();
};
