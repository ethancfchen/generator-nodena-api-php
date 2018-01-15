const SERVER_PORT = 8888;

module.exports = {
  domain: `http://localhost:${SERVER_PORT}`,
  localServer: {
    browserSync: {
      port: SERVER_PORT,
      ui: {
        port: SERVER_PORT + 2,
      },
    },
    php: {
      port: SERVER_PORT + 1,
      ini: './php.ini',
    },
  },

  /* Helper */

  isOnline: false,
};
