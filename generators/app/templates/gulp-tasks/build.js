const runSequence = require('run-sequence');

module.exports = function(cb) {
  runSequence(
    'build:clean',
    'build:composer',
    'build:php',
    'build:copy',
    cb
  );
};
