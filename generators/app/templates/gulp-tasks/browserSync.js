const $ = require('gulp-load-plugins')();

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = projectSetup(env);

  const optionsBrowserSync = setup.plugins.browserSync;
  const optionsConnectPhp = setup.plugins.gulpConnectPhp;

  optionsBrowserSync.proxy = '0.0.0.0:' + optionsConnectPhp.port;
  $.connectPhp.server(optionsConnectPhp);
  browserSync.init(optionsBrowserSync);
};
