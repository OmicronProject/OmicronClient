/**
 * Created by Michal on 2015-11-18.
 */
'use strict';

var path = require('path');

var build_directory = path.join(__dirname, 'dist');

module.exports = {
    entry: './src/test_hello_render.js',
    output: { path: build_directory, filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
