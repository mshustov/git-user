var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// var RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

var pkg = require('./package.json');
var DEBUG = process.env.NODE_ENV !== 'production';

var app =  {
    entry: {
        app: path.resolve('./src/input.js'),
        polyfill: path.resolve('./src/poly.js'),
    },

    output: {
        pathinfo: true,
        publicPath: '/',
        path: path.resolve('./build/'),
        filename: '[name].bundle.js'
    },

    // devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                browsers: pkg.browserslist,
                            },
                            modules: false,
                            useBuiltIns: true,
                            debug: true,
                        }],
                        'react',
                        // ...DEBUG ? ['react-hmre'] : [/*'react-optimize'*/]
                    ]
                }
            }]
        },{
            test: /\.css?$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    },

    plugins: [
        // new RuntimeAnalyzerPlugin(),
        new WriteFilePlugin({ log: false }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // not a built-in!
        new UglifyJSPlugin({
            sourceMap: true,
            comments: false,
            compress: {
                drop_console: true,
                drop_debugger: true,
                warnings: false
            }
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

var node =  {
    entry: {
        app: path.resolve('./src/node.js')
    },

    output: {
        pathinfo: true,
        publicPath: '/',
        path: path.resolve('./build/'),
        filename: '[name].bundle.js'
    },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            targets: {
                                node: "current"
                            },
                            // exclude: [
                            //     'web.timers',
                            //     'web.immediate',
                            //     'web.dom.iterable'
                            // ],
                            modules: false,
                            // useBuiltIns: true,
                            debug: true,
                        }],
                        'react',
                        // ...DEBUG ? ['react-hmre'] : [/*'react-optimize'*/]
                    ]
                }
            }]
        }]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};

module.exports = node;
