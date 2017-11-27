var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('script', function() {
  gulp.src('app/js/**/*.js')
    .pipe(order([
      "plugins/jquery.js",
      "plugins/slick.js",
      "plugins/picturefill.js",
      "plugins/diwanee-sticky.js",
      "triggerActiveClass.js",
      "backToTop.js",
      "tabs.js",
      "*.js"
    ]))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('app/assets/js/'))
    .pipe(reload({stream:true}));
});

gulp.task('html', function() {
   gulp.src('app/*.html')
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['browserSync'], function() {
   gulp.watch('app/scss/**/*.scss', ['sass']);
   gulp.watch('app/js/**/*.js', ['script']);
   gulp.watch('app/*.html', ['html']);
});

gulp.task('browserSync', function() {
   browserSync.init ({
       ghostMode: false,
       server: {
           baseDir: 'app',
       },
   })
});

gulp.task('default', ['sass', 'watch', 'html', 'script'])
