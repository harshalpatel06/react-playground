const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: {
        app: PATHS.app
    },

    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    // resolve: {
    //         moduleDirectories: ['app', 'build'],
    //         extensions: ['','.js','.scss']
    // },
    module: {
        loader: [{
            test: /\.css$/,
            loader: ['style', 'css?sourceMap', 'sass?sourceMap'],
            include: PATHS.app
        }]
    }
};


if (TARGET === 'start' || !TARGET) {
    module.exports = _.merge(common, {
        devtool: 'inline-source-map',
        devServer: {
            contentBase: PATHS.build,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (TARGET === 'build') {
    module.exports = _.merge(common, {});
}
