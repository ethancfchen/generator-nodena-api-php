const BaseAssets = require('./base/assets');

const COMPOSER_LOCK = 'composer.lock';
const SRC = {
  php: ['**/*'],
};
const VENDOR = 'vendor/';

class Assets extends BaseAssets {
  constructor(options) {
    super(options);

    const baseSrc = this.base.src;

    this.composerLock = COMPOSER_LOCK;
    this.src = SRC;
    this.vendor = VENDOR;
    this.watch = {
      php: baseSrc + '**/*',
    };
  }
}

module.exports = Assets;
