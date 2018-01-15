const _ = require('lodash');
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

function getProxyOptions() {
  const localServer = config.localServer || {};
  const connectPhp = localServer.php;
  const options = {};
  const defaults = {
    base: config.assets.build,
    target: '0.0.0.0:' + connectPhp.port,
    middleware: getMiddlewares(),
  };

  _.merge(options, defaults, connectPhp);
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
  const options = getOptions();
  localServer.init(options);
  taskDone();
};
