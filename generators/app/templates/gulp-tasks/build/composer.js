const childProcess = require('child_process');
const path = require('path');
const config = require('config');

const MAX_BUFFER = 1024 * 1024;

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
  const assets = config.assets;

  const vendorDir = path.join(assets.build, config.root, assets.vendor);

  const cmd = 'composer';
  const cmdConfig = [cmd, 'config', 'vendor-dir', vendorDir].join(' ');
  const cmdInstall = [cmd, 'install']
    .concat(config.isOnline ? ['--no-dev', '-o'] : ['--dev']).join(' ');
  const cmdUnset = [cmd, 'config', '--unset', 'vendor-dir'].join(' ');

  const options = {
    maxBuffer: MAX_BUFFER,
  };

  exec(cmdConfig, options)
    .then(() => exec(cmdInstall, options))
    .then(() => exec(cmdUnset, options))
    .then(taskDone)
    .catch(taskDone);
};
