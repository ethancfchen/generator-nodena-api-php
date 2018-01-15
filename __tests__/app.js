const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appAssets = [
  'gulp-tasks/build',
  'gulp-tasks/build/clean.js',
  'gulp-tasks/build/composer.js',
  'gulp-tasks/build/copy.js',
  'gulp-tasks/build/php.js',
  'gulp-tasks/localServer.js',
  'gulp-tasks/build.js',
  'gulp-tasks/watch.js',
  'config/default.js',
  'config/development.js',
  'config/stage.js',
  'config/production.js',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc.js',
  '.gitignore',
  'composer.json',
  'gulptasks.js',
  'php.ini',
];
const appOnlyTemplates = [
  '_tmp_.eslintignore',
  '_tmp_.eslintrc.js',
  '_tmp_.gitignore',
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
