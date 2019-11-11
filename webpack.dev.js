const path = require('path');
const merge =require('webpack-merge');
const common = require('./webpack.common');

// const webpack = require('webpack');


// @ts-ignore
module.exports =merge(common ,{
    devtool: 'inline-source-map',
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        host:'localhost',
        port:3000,
        proxy:{
            "/api":"http://localhost:3000"
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ 
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            modules: true,
                            localsConvention: 'camelCase'
                        },
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
})