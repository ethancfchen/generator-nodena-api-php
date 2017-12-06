const argv = require('../setup/argv');

const serverPort = argv.port || 8888;

module.exports = {
  domain: `http://localhost:${serverPort}`,
  localServer: {
    browserSync: {
      port: serverPort,
      ui: {
        port: serverPort + 2,
      },
    },
    php: {
      port: serverPort + 1,
      ini: './php.ini',
    },
  },

  /* Helper */

  isOnline: false,
};
