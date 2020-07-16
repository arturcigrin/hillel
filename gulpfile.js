const { src, dest, series, task, watch, parallel } = require('gulp');
const concatFile = require('gulp-concat');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 10 versions'] });
const sourcemaps = require('gulp-sourcemaps');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;

const path = {
  src: {
    html: ['./src/index.html'],
    css: ['path/to/style1.css', 'path/to/style2.css'],
    cssVendors: ['./node_modules/bootstrap/dist/css/bootstrap.min.css'],
    scripts: ['./src/scripts/*.js'],
    scriptVendors: ['./node_modules/jquery/dist/jquery.min.js'],
    styleLess: ['./src/less/**/*.less'],
  },
  output: {
    css: './dist/css/',
    js: './dist/src/',
    html: './dist/',
  },
};

task('copyHtml', () => src(path.src.html).pipe(dest(path.output.html)));

task('copyJS', () => {
  return src(path.src.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concatFile('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(dest(path.output.js));
});

task('copyVendorJS', () => src(path.src.scriptVendors).pipe(concatFile('vendors.js')).pipe(dest(path.output.js)));

task('copyVendorsCSS', () => src(path.src.cssVendors).pipe(concatFile('vendors.css')).pipe(dest(path.output.css)));

task('styleLess', () => {
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
});

task('watch', () => {
  watch(path.src.styleLess, series('styleLess'));
  watch(path.src.html, series('copyHtml'));
  watch(path.src.scripts, series('copyJS'));
});

task('default', series('copyHtml', 'copyVendorJS', 'copyJS', 'copyVendorsCSS', 'styleLess', parallel('watch')));
