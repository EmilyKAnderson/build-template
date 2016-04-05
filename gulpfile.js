// The require statements include the plugins needed for build
var conn = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
// var less = require('gulp-less');
var scss = require("gulp-scss");
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');
var livereload = require('gulp-livereload');
var merge2 = require('merge2');
var bowerMain = require('bower-main');


// This is a synchronous task - it has a callback on completion. This prevents
// any dependant tasks from running until clean is good and finished.
gulp.task('clean', function(cb) {
  del(['build/*'], cb);
});

// Check that the code is up to code
gulp.task('lint', ['clean'], function() {
  return gulp.src(['assets/js/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'));
});

//  Gets the required bower packages and outputs to vendor.js
gulp.task('vendorScripts', ['clean'], function() {
  var packages = [
    'assets/bower-packages/jquery/dist/jquery.min.js',
    'assets/bower-packages/angular/angular.min.js',
  ];
  return gulp.src(packages)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/js'));
});

// Convert the scss files into CSS, and concatenates them into a single, minified file in build/css
gulp.task('styles', ['clean'], function() {
  return gulp.src('assets/styles/scss/**/*.scss')
      .pipe(scss())
      .pipe(minifyCSS())
      .pipe(concat('all.css'))
      .pipe(gulp.dest('build/css'));
});

// Minify, concatenate and copy the JS into build/js
gulp.task('scripts', ['clean'], function() {
  return gulp.src('assets/js/**/*.js')
      .pipe(uglify())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('images', ['clean'], function() {
  return gulp.src('assets/img/*')
      .pipe(imagemin({
        progressive: true,
        use: [jpegtran()]
      }))
      .pipe(gulp.dest('build/img'));
});

// The build task - relies on 'clean', 'lint', 'vendorScripts', 'styles', 'scripts', and 'images'
gulp.task('build', ['clean', 'lint', 'vendorScripts', 'styles', 'scripts', 'images'], function() {
  return gulp.src(['assets/*.html'])
      .pipe(minifyHTML())
      .pipe(gulp.dest('build'))
      .pipe(livereload());
});

// Task to serve this locally using gulp-connect. Not for production usage.
gulp.task('serve', function() {
  conn.server({
    root: 'build',
    port: 3003,
    fallback: 'build/index.html'
  });
  console.log('Demo server started at localhost:3003');
});

// On change to local files, run the default task, then run the local server. Trigger rebuilds on any changes.
gulp.task('dev', ['build', 'serve'], function() {
  livereload.listen();
  gulp.watch(['assets/**/*', '*.js', 'assets/styles/scss/**/*.scss', 'assets/img/**/*'], ['default']);
});

gulp.task('default', ['build']);