const childProcess = require('child_process');
const path = require('path');

const Q = require('q');

const setup = require('setup/setup');

function exec(command) {
  const run = childProcess.exec;
  const defer = Q.defer();
  run(command, (err, stdout, stderr) => {
    if (err) {
      return defer.reject(stderr);
    }
    return defer.resolve(stdout);
  });
  return defer.promise;
}

module.exports = function(taskCallback) {
  const assets = setup.assets;

  const execOpts = setup.plugins.exec;

  const vendorDir = path.join(assets.build, setup.root, assets.vendor);

  const cmd = 'composer';
  const cmdConfig = [cmd, 'config', 'vendor-dir', vendorDir].join(' ');
  const cmdInstall = [cmd, 'install']
    .concat(setup.isOnline ? ['--no-dev', '-o'] : ['--dev']).join(' ');
  const cmdUnset = [cmd, 'config', '--unset', 'vendor-dir'].join(' ');

  exec(cmdConfig, execOpts)
    .then(() => {
      return exec(cmdInstall, execOpts);
    })
    .then(() => {
      return exec(cmdUnset, execOpts);
    })
    .fail((stderr) => {
      taskCallback(stderr);
      return Q.defer().promise;
    })
    .done(taskCallback);
};
