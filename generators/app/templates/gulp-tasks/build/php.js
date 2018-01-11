const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const through = require('through2');

const _ = require('lodash');

const setup = require('setup/setup');

function noop() {
  return through.obj();
}

module.exports = function() {
  const browserSync = this.context.browserSync;

  const assets = setup.assets;

  const src = assets.src.php;
  const dest = setup.root;

  const preprocessOpts = setup.plugins.gulpPreprocess;

  const phpData = (setup.globals || {}).php;
  const isPreprocess = !_.isEmpty(phpData);
  const filterOpts = preprocessOpts.filter.php;
  const $filter = filterOpts ? $.filter(filterOpts, {restore: true}) : noop();
  const $filterRestore = filterOpts ? $filter.restore : noop();

  preprocessOpts.context = _.merge(preprocessOpts.context, phpData);

  return gulp.src(src, {cwd: assets.base.src})
    .pipe($.if(isPreprocess, $filter))
    .pipe($.if(isPreprocess, $.preprocess(preprocessOpts)))
    .pipe($.if(isPreprocess, $filterRestore))
    .pipe(gulp.dest(dest, {cwd: assets.build}))
    .pipe(browserSync.stream());
};
