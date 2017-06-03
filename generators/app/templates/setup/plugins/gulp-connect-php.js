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
  constructor(options, assets) {
    const argv = options.argv || {};
    const pref = assets.getPreference();

    const server = pref.server || {};
    const port = argv.port || server.port;

    this.port = port + 1;
    this.base = assets.base.temp;
  }
}

module.exports = PluginGulpConnectPhp;
