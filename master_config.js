/**
 * Created by Michal on 2016-02-19.
 *
 * Sets configuration parameters and exports them where required
 *
 */
'use strict';

let api_url = process.env.API_URL || 'https://omicronserver.herokuapp.com';
let github_repo_url = 'https://github.com/MichalKononenko/OmicronClient';
let waffle_url = "https://waffle.io/MichalKononenko/OmicronClient";
let esdoc_url = "https://doc.esdoc.org/github.com/MichalKononenko/OmicronClient/";

let loaders = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015', 'react']
        }
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
    },
    { test: /\.jpe?g$/, loader: "file" },
    { test: /\.gif$/, loader: "file" },
    { test: /\.png$/, loader: "url-loader?limit=10000" },
    { test: /index\.html$/, loader: "file-loader?name=index.html" },
    { test: /favicon\.ico$/, loader: "file-loader?name=favicon.ico" }
];

module.exports = {
    api_url: api_url,
    github_repo_url: github_repo_url,
    waffle_url: waffle_url,
    esdoc_url: esdoc_url,
    loaders: loaders
};
