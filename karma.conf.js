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
                    { test: /\.js$/, loader: 'babel-loader' },
                    { test: /\.css$/, loader: "style-loader!css-loader" },
                    {
                        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"
                    },
                    {
                        test: /\.(woff|woff2)$/,
                        loader:"url?prefix=font/&limit=5000"
                    },
                    {
                        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=application/octet-stream"
                    },
                    {
                        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                        loader: "url?limit=10000&mimetype=image/svg+xml"
                    },
                    {
                        test: /\.jpe?g$/,
                        loader: "file"
                    },
                    {
                        test: /\.gif$/,
                        loader: "file"
                    },
                    {
                        test: /\.png$/,
                        loader: "url-loader?limit=10000"
                    }
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
