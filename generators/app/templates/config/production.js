const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {
  domain: '',
  localServer: false,

  /* Helper */

  isOnline: true,

  /* Assets */

  assets: {
    build: defer((config) => {
      return path.join(
        config.assets.base.dist,
        config.env
      );
    }),
  },
};
