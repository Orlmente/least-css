'use strict';
var gulp   = require('gulp'),
    sass   = require('gulp-ruby-sass'),
    prefix = require('gulp-autoprefixer'),
    ren    = require('gulp-rename');

gulp.task('styles', function(){
    return sass('styles/main.scss', {
        style:'expanded',
        lineNumbers:true
    })
    .pipe(prefix({
        browsers: [
            'last 2 versions',
            'ie 9-11'
        ],
        cascade: false
    }))
    .pipe(ren({
        basename: 'style'
    }))
    .pipe(gulp.dest('builds/assets/styles'));
});

gulp.task('watcher', function(){
    gulp.watch('styles/**/*.scss',['styles']);
});
