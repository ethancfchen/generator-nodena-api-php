const del = require('del');

const projectSetup = require('setup/setup');

module.exports = function() {
  const env = this.opts.env;

  const setup = projectSetup(env);
  const assets = setup.assets;

  return del([
    assets.composerLock,
    assets.dist,
  ]);
};
