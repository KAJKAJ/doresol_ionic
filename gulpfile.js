var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var clean = require('gulp-clean');
var inject = require("gulp-inject");
var bowerFiles = require('main-bower-files');


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['clean','sass','index']);

gulp.task('clean', function () {
  return gulp.src('./www/css', {read: false})
    .pipe(clean());
});

gulp.task('sass', function(done) {
  // gulp.src('./scss/ionic.app.scss')
  //   .pipe(sass())
  //   .pipe(gulp.dest('./www/css/'))
  //   .pipe(minifyCss({
  //     keepSpecialComments: 0
  //   }))
  //   .pipe(rename({ extname: '.min.css' }))
  //   .pipe(gulp.dest('./www/css/'))
  //   .on('end', done);
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css'));
});

gulp.task('index', function(){
  return gulp.src('./www/index.html')
    .pipe(inject(gulp.src(bowerFiles(), {read: false},{ base: './www/lib' }), {name: 'bower'}))
    .pipe(inject(gulp.src('./www/js/**/*.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src('./www/css/**/*.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
