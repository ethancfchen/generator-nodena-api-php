const _ = require('lodash');

const baseAssets = require('./base/assets');

const COMPOSER_LOCK = 'composer.lock';
const SRC = {
  php: ['**/*'],
};
const VENDOR = 'vendor/';

module.exports = function(config) {
  const assets = baseAssets(config);

  return _.merge(assets, {
    composerLock: COMPOSER_LOCK,
    src: SRC,
    vendor: VENDOR,
    watch: {
      php: assets.base.src + '**/*',
    },
  });
};
