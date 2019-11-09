const path = require('path');

let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        app:[ 'react-hot-loader/patch', './src/index.js'],
        vendor:['react','react-router-dom','react-dom']
    },
    output:{
        path:path.resolve(__dirname, './dist'),
        filename:'[name].[hash].js',
        chunkFilename:'[name].[chunkhash].js'
    },
    module:{
        rules:[

            {
                test:/\.js|jsx$/,
                use:[
                    {
                        loader:'babel-loader'
                    }
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
            // hash:true
        })
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1
                }
            }
        }
    },
    devtool: 'inline-source-map',
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        host:'localhost',
        port:3000,
        proxy:{
            "/api":"http://localhost:3000"
        }
    },
    mode:'development',
    resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
          '@':path.join(__dirname,'src')
        },
      }
}