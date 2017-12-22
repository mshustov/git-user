var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    entry: {
        app: path.join(__dirname, '/src/client.js')
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, './build/'),
        filename: '[name].js'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
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
}, {
    name: 'rempl',

    entry: {
        rempl: path.join(__dirname, './rempl-browser-ui.js'),
    },

    output: {
        path: path.join(__dirname,'./build/'),
        filename: 'rempl-browser-ui.js',
        library: 'rempl',
        libraryTarget: 'umd'
    },
}];
