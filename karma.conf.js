'use strict';

var webpack = require('webpack');

module.exports = function (config) {
    config.set({

        browsers: [ 'PhantomJS' ],

        singleRun: true,

        frameworks: [ 'mocha' ],

        files: [
            'tests.polyfill.js',
            'tests.webpack.js'
        ],

        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ],
            'src/*.js': ['coverage']
        },

        reporters: [ 'dots', 'coverage' ],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'lcovonly', subdir: '.', file: 'lcov.info' },
                { type: 'html', subdir: 'html' }
            ]
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, loader: 'babel-loader' }
                ],
                postLoaders: [{
                    test: /\.js?$/,
                    exclude: /(test|node_modules)/,
                    loader: 'istanbul-instrumenter'
                }]
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
