/**
 * Created by Michal on 2015-11-18.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');

var build_directory = path.join(__dirname, 'dist');

module.exports = {
    entry: './index.js',
    output: { path: build_directory, filename: 'bundle.min.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, loader: "style!css"
            }
        ]
    }
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({minimize: true})
    //]
};
