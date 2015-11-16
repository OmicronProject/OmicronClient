'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

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
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);