const gulp = require('gulp');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;

  const watches = assets.watch;

  gulp.watch(watches.php, ['build:php']);
};
