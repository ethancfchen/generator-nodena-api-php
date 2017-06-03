const Q = require('q');
const childProcess = require('child_process');

const Setup = require('setup/setup');

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

module.exports = function(cb) {
  const env = this.opts.env;

  const setup = new Setup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const execOpts = setup.plugins.exec;

  const vendorDir = assets.dist + pref.root + assets.vendor;

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
      cb(stderr);
      return Q.defer().promise;
    })
    .done(cb);
};
