const runSequence = require('run-sequence');

module.exports = function(taskCallback) {
  runSequence(
    'build:clean',
    'build:composer',
    'build:php',
    'build:copy',
    taskCallback
  );
};
