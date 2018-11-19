var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

var files = ['./src/components/**/*.js', './src/app.js'];

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: 'public',
  });

  gulp.watch(files, ['build']).on('change', browserSync.reload);
  gulp.watch('public/index.html').on('change', browserSync.reload);
});

gulp.task('build', function() {
  return gulp
    .src(files)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('public/assets'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/assets'));
});

gulp.task('default', ['serve']);
