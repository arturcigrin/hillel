const { src, dest, series, task, watch, parallel } = require('gulp');
const concatFile = require('gulp-concat');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 10 versions'] });
const sourcemaps = require('gulp-sourcemaps');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const path = {
  src: {
    html: ['./src/index.html'],
    cssVendors: ['./node_modules/bootstrap/dist/css/bootstrap.min.css', './node_modules/jquery-ui-dist/jquery-ui.min.css'],
    scripts: ['./src/scripts/**/*.js'],
    scriptVendors: ['./node_modules/jquery/dist/jquery.min.js', './node_modules/jquery-ui-dist/jquery-ui.min.js'],
    styleLess: ['./src/less/**/*.less'],
  },
  output: {
    css: './dist/css/',
    js: './dist/src/',
    html: './dist/',
  },
};

function copyHtml() {
  return src(path.src.html).pipe(dest(path.output.html));
}

function copyJS() {
  return src(path.src.scripts)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
        plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
      })
    )
    .pipe(uglify())
    .pipe(concatFile('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest(path.output.js));
}

function copyVendorJS() {
  return src(path.src.scriptVendors).pipe(concatFile('vendors.js')).pipe(dest(path.output.js));
}

function copyVendorsCSS() {
  return src(path.src.cssVendors).pipe(concatFile('vendors.css')).pipe(dest(path.output.css));
}

function copyLess() {
  return src(path.src.styleLess)
    .pipe(sourcemaps.init())
    .pipe(
      less({
        plugins: [autoprefix],
      })
    )
    .pipe(concatFile('main.min.css'))
    .pipe(cleancss({ level: 2 }))
    .pipe(sourcemaps.write())
    .pipe(dest(path.output.css));
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });

  watch(path.src.scripts, copyJS).on('change', reload);
  watch(path.src.html, copyHtml).on('change', reload);
  watch(path.src.styleLess, copyLess).on('change', reload);
}

module.exports.serve = series(copyHtml, copyVendorJS, copyJS, copyVendorsCSS, copyLess, serve);
module.exports.build = series(copyHtml, copyVendorJS, copyJS, copyVendorsCSS, copyLess);
