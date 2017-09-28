const _ = require('lodash');

const $ = require('gulp-load-plugins')();
const httpProxy = require('http-proxy-middleware');

const setup = require('setup/setup');

module.exports = function() {
  const browserSync = this.context.browserSync;

  const browserSyncOpts = setup.plugins.browserSync;
  const connectPhpOpts = setup.plugins.gulpConnectPhp;
  const proxyOpts = setup.plugins.httpProxyMiddleware;

  const middleware = [];

  _(proxyOpts.proxies).forEach((proxy) => {
    middleware.push(httpProxy(proxy.uri, proxy.options));
  });

  browserSyncOpts.proxy = {
    target: '0.0.0.0:' + connectPhpOpts.port,
    middleware,
  };
  $.connectPhp.server(connectPhpOpts);
  browserSync.init(browserSyncOpts);
};
