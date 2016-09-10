var webpack = require('webpack');
var path = require('path');
var failPlugin = require('webpack-fail-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, '/src/client.js')
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, './build/'),
        filename: 'bundle.js'
    },

    devtool: ['source-map'],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        failPlugin,
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                keepClosingSlash: true,
                removeEmptyElements: false
            }
        })
    ],

    devServer: {
        stats: {
            colors: true,
            timings: true,
            chunks: false,
            warnings: false
        }
    }
};
