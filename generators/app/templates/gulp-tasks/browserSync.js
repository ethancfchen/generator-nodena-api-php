const $ = require('gulp-load-plugins')();

const Setup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;
  const browserSync = this.opts.browserSync;

  const setup = new Setup(env);

  const browserSyncOpts = setup.plugins.browserSync;
  const connectPhpOpts = setup.plugins.gulpConnectPhp;

  browserSyncOpts.proxy = '0.0.0.0:' + connectPhpOpts.port;
  $.connectPhp.server(connectPhpOpts);
  browserSync.init(browserSyncOpts);
};
