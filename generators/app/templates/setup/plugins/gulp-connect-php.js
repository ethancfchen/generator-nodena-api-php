const config = require('config');
const argv = require('../argv');

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
    const server = config.server || {};
    const port = argv.port || server.port;

    this.port = port + 1;
    this.base = config.assets.build;
  }
}

module.exports = PluginGulpConnectPhp;
