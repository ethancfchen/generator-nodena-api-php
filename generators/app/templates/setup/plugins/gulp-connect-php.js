/**
 * Plugin Setup: gulp-connect-php
 *
 * @module setup/plugins/gulp-connect-php
 */

/**
 * Plugin Setup: gulp-connect-php
 *
 * @example {@lang javascript}
 * var gulpConnectPhp = require('./plugins/gulp-connect-php')(config, assets);
 *
 * @see {@link https://github.com/micahblu/gulp-connect-php/|Github}
 * @param  {object} config config Project configurations.
 * @param  {object} assets assets Project assets.
 * @return {object}        Plugins options.
 */
module.exports = function(config, assets) {
  const argv = config.argv || {};
  const pref = assets.getPreference();

  const server = pref.server || {};
  const port = argv.port || server.port;

  const options = {
    port: port + 1,
    base: assets.base.temp,
  };
  return options;
};
