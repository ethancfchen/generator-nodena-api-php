const runSequence = require('run-sequence');

module.exports = function(taskCallback) {
  runSequence(
    'release',
    taskCallback
  );
};
