const path = require('path');
const merge =require('webpack-merge');
const common = require('./webpack.common');
const apiMocker = require('webpack-api-mocker');

// const webpack = require('webpack');


// @ts-ignore
module.exports =merge(common ,{
    devtool: 'inline-source-map',
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        host:'localhost',
        port:3000,
        before(app) {
            apiMocker(app,path.resolve('./mock/index.js'),{
                proxy:{
                    '/api':'http://localhost:3000'
                },
                changeHost: true,
            }) 
        },
    },
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use:[ 
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // options: {
                        //     import: true,
                        //     modules: true,
                        //     localsConvention: 'camelCase'
                        // },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    },
                    "postcss-loader"
                ],
            }
        ]
    },
})