var webpack = require('webpack');
var path = require('path');
var WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');
var DEBUG = process.env.NODE_ENV !== 'production';

var app =  {
    entry: {
        app: path.resolve('./src/input.js')
    },

    output: {
        pathinfo: true,
        publicPath: '/',
        path: path.resolve('./build/'),
        filename: '[name].bundle.js',
        chunkFilename: '[name]'
    },

    // devtool: 'source-map',
    profile: true,

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        ['env', {
                            targets: {
                                browsers: 'Chrome 62'//pkg.browserslist,
                            },
                            modules: false,
                            useBuiltIns: true,
                            debug: true,
                        }],
                        'react',
                        // ...DEBUG ? ['react-hmre'] : [/*'react-optimize'*/]
                    ],
                    plugins: [
                        ['babel-plugin-transform-redux-saga-source', {
                            basePath: process.cwd()
                        }]
                    ]
                }
            }
        ]
        },{
            test: /\.css?$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }]
            })
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        }),
        ...DEBUG ?
        [
            // new WriteFilePlugin({ log: false }),
        ] :
        [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                sourceMap: true,
                comments: false,
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                    warnings: false,
                    unused: true,
                    dead_code: true,
                    screw_ie8: true,
                },
                mangle: {
                    screw_ie8: true,
                },
                output: {
                    comments: false,
                    screw_ie8: true,
                },
            }),
        ]
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true,
        //         keepClosingSlash: true,
        //         removeEmptyElements: false
        //     }
        // })
    ]

    // devServer: {
    //     stats: {
    //         colors: true,
    //         timings: true,
    //         chunks: false,
    //         warnings: false
    //     }
    // }
};

module.exports = app;
