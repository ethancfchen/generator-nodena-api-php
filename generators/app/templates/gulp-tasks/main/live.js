const runSequence = require('run-sequence');

module.exports = function(cb) {
  runSequence(
    'release',
    cb
  );
};
