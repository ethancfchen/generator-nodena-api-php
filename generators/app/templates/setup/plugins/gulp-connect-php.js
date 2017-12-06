const config = require('config');

const _ = require('lodash');

/**
 * Plugin Setup: gulp-connect-php
 *
 * @module setup/plugins/gulp-connect-php
 *
 * @example {@lang javascript}
 * const PluginGulpConnectPhp = require('./plugins/gulp-connect-php');
 * const pluginGulpConnectPhp = new PluginGulpConnectPhp(options, assets);
 *
 * @see {@link https://github.com/micahblu/gulp-connect-php/|Github}
 */
class PluginGulpConnectPhp {
  constructor() {
    const localServer = config.localServer || {};
    const php = localServer.php || {};

    _.merge(this, {
      base: config.assets.build,
    }, php);
  }
}

module.exports = PluginGulpConnectPhp;
