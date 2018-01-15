const gulp = require('gulp');
const config = require('config');

module.exports = function(taskDone) {
  const assets = config.assets;

  const watches = assets.watch;

  gulp.watch(watches.php, gulp.parallel('build:php'));

  taskDone();
};
