/**
 * Created by Michal on 2015-11-17.
 */
function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}

module.exports = {
    entry: {
        hello_render: getEntrySources([
            './src/hello_render.js'
        ])
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['jsx', 'babel'],
                exclude: /node_modules/
            }
        ]
    }
};
