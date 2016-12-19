// tutorials:
// https://css-tricks.com/gulp-for-beginners/
// http://stackoverflow.com/questions/31163754/browser-sync-does-not-refresh-page-after-changes-with-gulp
// http://stackoverflow.com/questions/21679844/livereload-of-index-html-with-gulp
// https://www.npmjs.com/package/gulp-stylus
// http://codehangar.io/concatenate-and-minify-javascript-with-gulp/
// https://quickleft.com/blog/setting-up-a-clientside-javascript-project-with-gulp-and-browserify/

// DEPENDANCIES:
var gulp          = require('gulp');
var sass          = require('gulp-ruby-sass');
var browserSync   = require('browser-sync').create();
var reload        = browserSync.reload;
var cleanCSS      = require('gulp-clean-css');
var stylus        = require('gulp-stylus');
var less          = require('gulp-less');
var path          = require('path');
var jshint        = require('gulp-jshint');
var concat        = require('gulp-concat');
var rename        = require('gulp-rename');
var uglify        = require('gulp-uglify');
var jquery        = require('jquery');
// var browserify    = require('browserify');
var imagemin      = require('gulp-imagemin');



// GENERAL TASKS:
// Uncomment for stylus or less
gulp.task('watch', function(){
  gulp.watch('work_here/stylesheets/scss/*.scss', ['sass']);
  gulp.watch('work_here/stylesheets/stylus/*.styl', ['stylus']);
  gulp.watch('work_here/stylesheets/less/*.less', ['less']);
  gulp.watch('*.js', ['jshint']);
  gulp.watch('work_here/js/*.js', ['scripts']);
  // gulp.watch('work_here/images/*', ['image']);
  // reloads browser
  gulp.watch("*.html").on("change", reload);
  gulp.watch("*.js").on("change", reload);
});

// SASS
gulp.task('sass', function(){
  sass('work_here/stylesheets/scss/*.scss')
  .on('error', sass.logError)
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('public/css'))
        // injects changes into browser when change of scss:
        .pipe(browserSync.stream({match: '**/*.css'}));
      });

// LESS
gulp.task('less', function() {
 return gulp.src('work_here/stylesheets/less/*.less')
 .pipe(less({
  paths: [ path.join(__dirname, 'less', 'includes') ]
}))
 .pipe(cleanCSS({compatibility: 'ie8'}))
 .pipe(gulp.dest('public/css'))
 .pipe(browserSync.stream({match: '**/*.css'}));
});

// STYLUS
gulp.task('stylus', function(){
  return gulp.src('work_here/stylesheets/stylus/*.styl')
  .pipe(stylus())
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('public/css'))
        // injects changes into browser when change of stylus:
        .pipe(browserSync.stream({match: '**/*.css'}));
      });

// JS ERRORS:
gulp.task('jshint', function() {
  return gulp.src('*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});


// JS TASKS
var jsFiles = 'work_here/js/*.js',
jsDest = '.';

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
  .pipe(concat('work_here/js/compiledJS/concat.js'))
  .pipe(gulp.dest(jsDest))
  .pipe(rename('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest(jsDest));
});

// COMPRESS IMAGES:
gulp.task('image', function() {
 gulp.src('work_here/images/*')
 .pipe(imagemin({
  progressive: true
}))
 .pipe(gulp.dest('public/images'))
});

// BROWSERSYNC:
browserSync.init({
    // injects changes instead of browser reload
    injectChanges: true,
    // base location of index.html:
    server: "."
  });

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });
});



