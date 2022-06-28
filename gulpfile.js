// plugins
const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');
const webpack = require('webpack-stream');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-dart-sass');
const browsersync = require('browser-sync').create();

const distFolder = './dist/';
const srcFolder = './src/';

const paths = {
  css: {
    src: './src/css/**/*.css',
    dest: './dist/css/',
  },
  js: {
    src: './src/js/**/*.js',
    dest: './dist/js/',
  },
  lib: {
    src: './src/lib/**/*.js',
    dest: './dist/lib/',
  },
  scss: {
    src: './src/css/**/*.scss',
    dest: './dist/css/',
  },
  html: {
    src: './src/**/*.html',
    dest: './dist/',
  }
};

// clean dist
function clear() {
  return del([distFolder]);
}

function html() {
  return (
    gulp
      .src(paths.html.src, { since: gulp.lastRun(html) })
      .pipe(plumber())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(paths.html.dest))
  );
}


function css() {
  return (
    gulp
      .src(paths.css.src, { since: gulp.lastRun(css) })
      .pipe(plumber())
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.css.dest))
  );
}

function js() {
  return (
    gulp
      .src('./src/js/index.js', { since: gulp.lastRun(js) })
      .pipe(plumber())
      .pipe(webpack({output:{filename: 'index.js'}}))
      .pipe(terser())
      .pipe(gulp.dest(paths.js.dest))
  );
}

function lib() {
  return (
    gulp
      .src(paths.lib.src, { since: gulp.lastRun(lib) })
      .pipe(plumber())
      .pipe(gulp.dest(paths.lib.dest))
  );
}

function scss() {
  return (
    gulp
      .src(paths.scss.src, { since: gulp.lastRun(scss) })
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(gulp.dest(paths.scss.dest))
  );
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: distFolder,
    },
    port: 3000,
  });
}

//Dev

function scssDev() {
  return (
    gulp
      .src(paths.scss.src, { since: gulp.lastRun(scssDev) })
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(gulp.dest('./src/css/'))
      .pipe(browsersync.stream())
  );
}

function watchDev() {
  gulp.watch(paths.scss.src, scssDev);
  gulp.watch([paths.css.src, paths.js.src, paths.html.src]).on('change', browsersync.reload);
}

function browserSyncDev() {
  browsersync.init({
    server: {
      baseDir: srcFolder,
    },
    port: 3000,
  });
}

const build = gulp.series(clear, html, js, lib, scss, css, browserSync);
const dev = gulp.parallel(watchDev, browserSyncDev);


// exports
exports.clear = clear;
exports.build = build;
exports.dev = dev;
exports.default = dev;
