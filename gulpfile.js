'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('build', function () {
    browserify({
        entries: 'index.js',
        extensions: ['.js', '.jsx'],
        debug: true
    })
        .transform(babelify.configure({
            presets: ["es2015", "react"]
        }))
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function(){
    gulp.src('dist/main.js')
        .pipe(uglify())
        .pipe(rename("main.min.js"))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build', 'compress']);