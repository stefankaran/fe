var gulp = require('gulp'),
    sass = require('gulp-sass'),
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

// gulp.task('script', function() {
//     return gulp.src([
//       'app/js/main.js'
//     ])
//     .pipe(gulp.dest('app/assets/js/'))
//     .pipe(reload({stream:true}));
// });

gulp.task('html', function() {
   gulp.src('app/*.html')
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['browserSync'], function() {
   gulp.watch('app/scss/**/*.scss', ['sass']);
   gulp.watch('app/*.html', ['html']);
   // gulp.watch('app/js/main.js', ['script']);
});

gulp.task('browserSync', function() {
   browserSync.init ({
       server: {
           baseDir: 'app'
       },
   })
});

gulp.task('default', ['sass', 'watch', 'html'])
