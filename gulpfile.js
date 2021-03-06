require('dotenv').config();

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var replace = require('gulp-replace');

var browserSync = null;

if (process.env.NODE_ENV !== 'production') {
  browserSync = require('browser-sync').create();
}

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

gulp.task('is-prod', function() {
  isProd = true;
});

gulp.task('clean-scripts', function() {
  return del(config.scripts.del);
});

gulp.task('clean-styles', function() {
  return del(config.styles.del);
});

gulp.task('scripts', ['clean-scripts'], function() {
  var scriptsPipeLine = gulp
    .src(config.scripts.source)
    .pipe(replace(/YOUTUBE_API_KEY/g, process.env.YOUTUBE_API_KEY))
    .pipe(sourcemaps.init())
    .pipe(concat(config.scripts.concat))
    .pipe(uglify())
    .pipe(sourcemaps.write(config.scripts.sourcemaps))
    .pipe(gulp.dest(config.scripts.dest));

  if (process.env.NODE_ENV !== 'production') {
    scriptsPipeLine = scriptsPipeLine.pipe(browserSync.stream());
  }

  return scriptsPipeLine;
});

gulp.task('styles', ['clean-styles'], function() {
  var stylesPipeLine = gulp
    .src(config.styles.source)
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(concat(config.styles.concat))
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write(config.styles.sourcemaps))
    .pipe(gulp.dest(config.styles.dest));

  if (process.env.NODE_ENV !== 'production') {
    stylesPipeLine = stylesPipeLine.pipe(browserSync.stream());
  }

  return stylesPipeLine;
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: 'public',
  });

  gulp.watch(config.scripts.source, ['scripts']);
  gulp.watch(config.styles.source, ['styles']);

  gulp.watch('public/*.html').on('change', browserSync.reload);
});

gulp.task('build', ['scripts', 'styles']);

gulp.task('default', ['serve']);
