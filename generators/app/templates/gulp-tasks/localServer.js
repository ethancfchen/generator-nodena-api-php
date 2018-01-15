const _ = require('lodash');
const $ = require('gulp-load-plugins')();
const httpProxyMiddleware = require('http-proxy-middleware');
const config = require('config');

function getMiddlewares() {
  const localServer = config.localServer || {};
  const proxies = localServer.proxy || [];
  const middlewares = Array.prototype.map.call(proxies, (proxy) => {
    return httpProxyMiddleware(proxy.uri, proxy.options);
  });
  return middlewares;
}

function getConnectPhpOptions() {
  const localServer = config.localServer || {};
  const connectPhp = localServer.php;
  const options = {};
  const defaults = {
    base: config.assets.build,
  };

  _.merge(options, defaults, connectPhp);
  return options;
}

function getProxyOptions() {
  const localServer = config.localServer || {};
  const connectPhp = localServer.php;
  const options = {
    target: '0.0.0.0:' + connectPhp.port,
    middleware: getMiddlewares(),
  };

  return options;
}

function getOptions() {
  const localServer = config.localServer || {};
  const browserSync = localServer.browserSync || {};
  const options = {};
  const defaults = {
    proxy: getProxyOptions(),
    https: false,
    open: false,
  };

  _.merge(options, defaults, browserSync);
  return options;
}

module.exports = function(taskDone) {
  const localServer = this.context.localServer;
  const connectPhpOptions = getConnectPhpOptions();
  const options = getOptions();

  $.connectPhp.server(connectPhpOptions);
  localServer.init(options);
  taskDone();
};
