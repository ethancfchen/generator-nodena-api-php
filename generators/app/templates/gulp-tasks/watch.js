const gulp = require('gulp');

const setup = require('setup/setup');

module.exports = function() {
  const assets = setup.assets;

  const watches = assets.watch;

  gulp.watch(watches.php, ['build:php']);
};
