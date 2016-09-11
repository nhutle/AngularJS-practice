var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();
var flags = {
  production: false
};

// Lint JS code
gulp.task('lint', function() {
  return gulp.src([
      'javascripts/**/*.js',
      '!javascripts/main.js',
      '!javascripts/main.min.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Compile Sass
gulp.task('sass', function() {
  return gulp.src('styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(flags.production ? 'dist/styles' : 'styles'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
});


// Minify CSS
gulp.task('css', function() {
  return gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/font-awesome/css/font-awesome.min.css',
      'bower_components/Calendario/css/calendar.css',
      'bower_components/Calendario/css/custom_2.css'
    ])
    .pipe(concat('lib.css'))
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(flags.production ? 'dist/styles' : 'styles'))
});


// Concatenate and Minify JS
gulp.task('scripts', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/Calendario/js/jquery.calendario.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'javascripts/app.js',
      'javascripts/controllers/**/*.js',
      'javascripts/services/**/*.js',
      'javascripts/filters/**/*.js',
      'javascripts/directives/**/*.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('javascripts'));
});

gulp.task('scripts-build', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/Calendario/js/jquery.calendario.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'javascripts/app.js',
      'javascripts/controllers/**/*.js',
      'javascripts/services/**/*.js',
      'javascripts/filters/**/*.js',
      'javascripts/directives/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/javascripts'));
});


// Copy files
gulp.task('copy', function() {
  // copy html
  gulp.src([
    '*.html',
    'views/*.*/*.html'
  ])
    .pipe(gulp.dest('dist'));

  // copy fonts
  gulp.src([
      'assets/fonts/*.*',
      'bower_components/bootstrap/fonts/*.*',
      'bower_components/fontawesome/fonts/*.*'
    ])
    .pipe(gulp.dest('dist/assets/fonts'));
});


// Clean dist folder
gulp.task('clean', function() {
  return gulp.src('./dist/**/*.*', { read: false })
    .pipe(rimraf({ force: true }));
});


// Minify images
gulp.task('image', function() {
  return gulp.src('assets/images/**/*.*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/assets/images'));
});


// Default task
gulp.task('default', ['sass', 'lint', 'scripts'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('javascripts/**/*.*', ['lint', 'scripts']);
  gulp.watch('styles/**/*.*', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Build task
gulp.task('build', ['clean', 'copy', 'sass', 'css', 'lint', 'scripts-build'], function() {
  flags.production = true;

  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});
