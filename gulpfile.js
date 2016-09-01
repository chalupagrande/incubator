'use strict';

var gulp = require('gulp')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./client/"
        }
    });

    gulp.watch(["./client/**/*.scss"], ['sass']);
    gulp.watch(["./client/*.html", "./sass/**/*.scss"]).on('change', browserSync.reload);
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(["./client/**/*.scss"])
        .pipe(sass())
        .pipe(gulp.dest("./client/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);