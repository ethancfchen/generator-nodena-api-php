const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks/build',
  'gulp-tasks/build/clean.js',
  'gulp-tasks/build/composer.js',
  'gulp-tasks/build/copy.js',
  'gulp-tasks/build/php.js',
  'gulp-tasks/main',
  'gulp-tasks/main/bypass.js',
  'gulp-tasks/main/live.js',
  'gulp-tasks/main/local.js',
  'gulp-tasks/main/stage.js',
  'gulp-tasks/browserSync.js',
  'gulp-tasks/build.js',
  'gulp-tasks/release.js',
  'gulp-tasks/watch.js',
  'setup/plugins/browser-sync.js',
  'setup/plugins/gulp-connect-php.js',
  'setup/plugins/gulp-preprocess.js',
  'setup/assets.js',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc.js',
  '.gitignore',
  'composer.json',
  'setup.json',
  'gulptasks.js',
];
const appOnlyTemplates = [
  '_tmp_.gitignore',
  '_tmp_.eslintrc.js',
];

describe('generator-nodena-api-php:app', () => {
  beforeAll(() => {
    const deps = [
      [helpers.createDummyGenerator(), 'nodena:app'],
    ];
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withGenerators(deps);
  });

  it('creates files', () => {
    assert.file(appAssets);
  });

  it('not includes templates', () => {
    assert.noFile(appOnlyTemplates);
  });
});
