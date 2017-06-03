const gulp = require('gulp');

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;

  const watches = assets.watch;

  gulp.watch(watches.php, ['build:php']);
};
