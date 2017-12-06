const path = require('path');
const defer = require('config/defer').deferConfig;

const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;
const argv = require('../setup/argv');

module.exports = {
  root: 'api',
  proxy: [],
  globals: {
    php: {},
  },
  preprocess: {
    filter: {
      php: ['**/*.php'],
    },
  },
  copy: [],
  localServer: false,

  /* Helper */

  env: NODE_ENV,
  appInstance: NODE_APP_INSTANCE,
  isOnline: false,
  isVerbose: argv.verbose,

  /* Assets */

  assets: {
    base: {
      src: 'src',
      build: 'build',
      dist: 'dist',
      res: 'res',
    },
    src: {
      php: ['**/*'],
    },
    vendor: 'vendor',
    build: defer((config) => {
      return config.assets.base.build;
    }),
    watch: {
      php: defer((config) => {
        return path.join(config.assets.base.src, '**/*');
      }),
    },
    jsdoc: {
      files: [
        './*.js',
        './setup/**/*.js',
      ],
      dest: 'doc',
    },

    composerLock: 'composer.lock',
    manifest: 'package.json',
    readme: 'README.md',
  },
};
