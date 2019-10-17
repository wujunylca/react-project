const path = require('path');



let HtmlWebpackPlugin = require('html-webpack-plugin');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry:[ 'react-hot-loader/patch', './src/index.js'],
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname, './dist')
    },
    module:{
        rules:[

            {
                test:/\.js|jsx$/,
                use:[
                    {
                        loader:'babel-loader'
                        // options:{
                        //     presets:['env']
                        // }
                    }
                ]
            },
            {
                test:/\.css$/,
                use:['style-loader']
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
            // hash:true
        })
    ],
    devServer:{},
    mode:'development',
    resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      }
}