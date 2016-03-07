'use strict';

var webpack = require('webpack');
var master_config = require('./master_config');

module.exports = function(config) {
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
                    { test: /\.jsx?$/, loader: 'babel-loader' }
                ].concat(master_config.non_js_loaders),
                postLoaders: [{
                    test: /\.js?$/,
                    exclude: /(test|node_modules)/,
                    loader: 'istanbul-instrumenter'
                }],
                plugins: master_config.plugins(webpack)
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
