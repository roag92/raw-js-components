var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

var browserSync = require('browser-sync').create();

var config = {
  scripts: {
    source: ['./src/components/**/*.js', './src/app.js'],
    dest: 'public/assets/js',
    del: ['public/assets/js/**/*.*', '!public/assets/js/.gitkeep'],
    concat: 'scripts.min.js',
    sourcemaps: './',
  },
  styles: {
    source: ['./styles/**/*.scss'],
    dest: 'public/assets/css',
    del: ['public/assets/css/**/*.*', '!public/assets/js/.gitkeep'],
    concat: 'styles.min.css',
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false,
    },
    sourcemaps: './',
  },
};

gulp.task('clean-scripts', function() {
  return del(config.scripts.del);
});

gulp.task('clean-styles', function() {
  return del(config.styles.del);
});

gulp.task('scripts', ['clean-scripts'], function() {
  return gulp
    .src(config.scripts.source)
    .pipe(sourcemaps.init())
    .pipe(concat(config.scripts.concat))
    .pipe(uglify())
    .pipe(sourcemaps.write(config.scripts.sourcemaps))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(browserSync.stream());
});

gulp.task('styles', ['clean-styles'], function() {
  return gulp
    .src(config.styles.source)
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(concat(config.styles.concat))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(config.styles.sourcemaps))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['scripts', 'styles'], function() {
  browserSync.init({
    server: 'public',
  });

  gulp.watch(config.scripts.source, ['scripts']);
  gulp.watch(config.styles.source, ['styles']);

  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
