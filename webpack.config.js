var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

var pkg = require('./package.json');
var DEBUG = process.env.NODE_ENV !== 'production';

var app =  {
    entry: {
        app: path.resolve('./src/input.js')
        // polyfill: path.resolve('./src/poly.js'),
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
            test: /\.js?$/,
            use: ['source-map-loader'],
            enforce: 'pre'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
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
        // new RuntimeAnalyzerPlugin(),
        // new WriteFilePlugin({ log: false }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'polyfill',
        //     filename: 'polyfill.js',
        //     minChunks: Infinity
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
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
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true
        })
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

// var node =  {
//     entry: {
//         app: path.resolve('./src/node.js')
//     },

//     output: {
//         pathinfo: true,
//         publicPath: '/',
//         path: path.resolve('./build/'),
//         filename: '[name].bundle.js'
//     },

//     devtool: 'source-map',

//     module: {
//         loaders: [{
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             use: [{
//                 loader: 'babel-loader',
//                 options: {
//                     presets: [
//                         ['env', {
//                             targets: {
//                                 node: "current"
//                             },
//                             // exclude: [
//                             //     'web.timers',
//                             //     'web.immediate',
//                             //     'web.dom.iterable'
//                             // ],
//                             modules: false,
//                             // useBuiltIns: true,
//                             debug: true,
//                         }],
//                         'react',
//                         // ...DEBUG ? ['react-hmre'] : [/*'react-optimize'*/]
//                     ]
//                 }
//             }]
//         }]
//     },

//     plugins: [
//         new webpack.NoEmitOnErrorsPlugin(),
//         new webpack.DefinePlugin({
//             'process.env.NODE_ENV': JSON.stringify('development')
//         })
//     ]
// };

module.exports = app;
