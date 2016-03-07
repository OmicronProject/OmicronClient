/**
 * Created by Michal on 2016-02-17.
 */
/**
 * Created by Michal on 2015-11-18.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var master_config = require('./master_config');

var build_directory = path.join(__dirname, 'dist');

module.exports = {
    entry: './index.js',
    output: {
        path: build_directory, filename: 'bundle.min.js',
        publicPath: "/dist/"
    },
    module: {
        loaders: master_config.loaders
    },
    plugins: master_config.plugins(webpack).concat([
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'})
    ])
};