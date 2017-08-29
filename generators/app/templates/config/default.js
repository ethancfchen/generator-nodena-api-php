const path = require('path');
const defer = require('config/defer').deferConfig;

const NODE_ENV = process.env.NODE_ENV;
const NODE_APP_INSTANCE = process.env.NODE_APP_INSTANCE;
const argv = require('../setup/argv');

module.exports = {
  root: 'api',
  server: {
    port: argv.port || 8888,
    https: false,
  },
  proxy: [],
  globals: {
    php: {},
  },
  copy: [],

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
    dest: {
      docs: '**/*.html',
      styles: 'css',
      scripts: 'js',
      images: 'img',
      index: 'index.html',
    },
    watch: {
      php: defer((config) => {
        return path.join(config.assets.base.src, '**/*');
      }),
    },

    composerLock: 'composer.lock',
    manifest: 'package.json',
    readme: 'README.md',
  },
};
