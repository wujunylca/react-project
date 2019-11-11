const path = require('path');

const merge =require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')



// @ts-ignore

module.exports = merge(common ,{
    devtool: 'source-map',
    mode:'production',
    plugins:[
        new UglifyJSPlugin({
            sourceMap:true
        }),
        new MiniCssExtractPlugin({
            filename:"css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].chunk.css"
        }),
        new OptimizeCssAssetsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                styles: {
                  name: 'styles',
                  test: /\.css$/,
                  chunks: 'all',
                  enforce: true,
                },
            },
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ 
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            modules: true,
                        },
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
});