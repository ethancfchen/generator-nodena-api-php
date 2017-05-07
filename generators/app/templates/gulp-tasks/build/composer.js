const Q = require('q');
const childProcess = require('child_process');

const projectSetup = require('setup/setup');

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

  const setup = projectSetup(env);
  const assets = setup.assets;
  const pref = setup.getPreference();

  const optionsExec = setup.plugins.exec;

  const vendorDir = assets.dist + pref.root + assets.vendor;
  const installOptions = setup.isOnline ? ['--no-dev', '-o'] : ['--dev'];

  const cmd = 'composer';
  const cmdConfig = [cmd, 'config', 'vendor-dir', vendorDir].join(' ');
  const cmdInstall = [cmd, 'install'].concat(installOptions).join(' ');
  const cmdUnset = [cmd, 'config', '--unset', 'vendor-dir'].join(' ');
  const execOptions = {
    maxBuffer: optionsExec.maxBuffer,
  };

  exec(cmdConfig, execOptions)
    .then(() => {
      return exec(cmdInstall, execOptions);
    })
    .then(() => {
      return exec(cmdUnset, execOptions);
    })
    .fail((stderr) => {
      cb(stderr);
      return Q.defer().promise;
    })
    .done(cb);
};
