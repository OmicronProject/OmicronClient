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
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },

        reporters: [ 'dots' ],

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, loader: 'babel-loader' }
                ]
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
