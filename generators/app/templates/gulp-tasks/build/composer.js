const childProcess = require('child_process');
const path = require('path');

const setup = require('setup/setup');

function exec(command) {
  const run = childProcess.exec;
  return new Promise((resolve, reject) => {
    run(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }
      return resolve(stdout);
    });
  });
}

module.exports = function(taskDone) {
  const assets = setup.assets;

  const execOpts = setup.plugins.exec;

  const vendorDir = path.join(assets.build, setup.root, assets.vendor);

  const cmd = 'composer';
  const cmdConfig = [cmd, 'config', 'vendor-dir', vendorDir].join(' ');
  const cmdInstall = [cmd, 'install']
    .concat(setup.isOnline ? ['--no-dev', '-o'] : ['--dev']).join(' ');
  const cmdUnset = [cmd, 'config', '--unset', 'vendor-dir'].join(' ');

  exec(cmdConfig, execOpts)
    .then(() => exec(cmdInstall, execOpts))
    .then(() => exec(cmdUnset, execOpts))
    .catch(taskDone);
};
