/**
 * Created by Michal on 2015-11-18.
 */
'use strict';

var path = require('path');
var webpack = require('webpack');

var build_directory = path.join(__dirname, 'dist');

module.exports = {
    entry: './index.js',
    output: { path: build_directory, filename: 'bundle.min.js',
              publicPath: "/dist/"
            },
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
                test: /\.css$/, loader: "style-loader!css-loader"
            },
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
            }
        ]
    }
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin({minimize: true})
    //]
};
