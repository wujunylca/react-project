# react-project

# v1.0.1

# 创建react 项目架子

# 网站优化  webapck 配置

+ 使用的话 默认了解过webpack  在webpack.config.js 中修改

#步骤1:dev-server
  +参考地址：几个热加载对比  https://www.jianshu.com/p/bcad129a1c69
  
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        host:'localhost',
        port:3000,
        proxy:{
            "/api":"http://localhost:3000"
        }
    },

    
#步骤2:devtool 开发环境,定位错误代码 

        devtool: 'inline-source-map',
        
#步骤3:缓存 output hash 文件
    假设第一次下载了文件，下一次访问就不下载了。
  
            output:{
            path:path.resolve(__dirname, './dist'),
            filename:'[name].[hash].js',
            chunkFilename:'[name].[chunkhash].js'
        },
        
       此时打包，可以看到dist 文件下的文件名已经变成了hash的文件名了

  
#步骤4:提取公共文件，避免重复打包 entry 


    import {HashRouter,Route,Switch,hashHistory} from 'react-router-dom';
     <HashRouter history={hashHistory}>
                <Switch> 
                    <Route exact path='/' component={Home} ></Route>
                    <Route exact path='/page1' component={Home} ></Route>
                    <Route exact path='/page2' component={Page2} ></Route>
                </Switch>
            </HashRouter>
 
#步骤5:代码分离 按需加载，只加载对应的文件,
修改入口

    entry: {
        app:[ 'react-hot-loader/patch', './src/index.js'],
        vendor:['react','react-router-dom','react-dom']
    },

添加配置

        optimization:{
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1
                }
            }
        }
    }

#步骤6:生产环境和开发环境分离
  安装webpack-merge
  新建 webpack.dev.js webpack.prod.js webpack.common.js
  
  
  + webpack.dev.js
  
        const path = require('path');
        const merge =require('webpack-merge');
        const common = require('./webpack.common');
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
        })
        
  + webpack.common.js
  
          const path = require('path');

          let HtmlWebpackPlugin = require('html-webpack-plugin');
          let {CleanWebpackPlugin} = require('clean-webpack-plugin');


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
              resolve: {
                  alias: {
                    'react-dom': '@hot-loader/react-dom',
                    '@':path.join(__dirname,'src')
                  },
                }
          }

+ webpack.prod.js
uglifyjs-webpack-plugin 用来压缩文件

           const path = require('path');

          const merge =require('webpack-merge');
          const common = require('./webpack.common');
          const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
          const webpack = require('webpack');


          // @ts-ignore
          module.exports = merge(common ,{
              devtool: 'source-map',
              plugins:[
                  new UglifyJSPlugin({
                      sourceMap:true
                  }),
                  new webpack.DefinePlugin({
                      'process.env.NODE_ENV': JSON.stringify('production')
                  })
              ]

          })
          
  + 修改package.json
  
        "scripts": {
          "build": "webpack --config webpack.prod.js",
          "start": "webpack-dev-server --open --config webpack.dev.js",
          "test": "echo \"Error: no test specified\" && exit 1"
        },
  +此时打包启动都没问题了。
  
  #步骤7:抽离css  mini-css-extract-plugin   压缩css optimize-css-assets-webpack-plugin
    删除common.js 中css loader 的配置，移到 dev 和prod 配置文件中
    
    主要修改prod 文件 
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
                      use:[ MiniCssExtractPlugin.loader,'css-loader']
                  }
              ]
          },
      });
    
  #步骤8:集成postcss  解决兼容性问题
  安装 postcss-cssnext postcss-loader --dev
  
  配置 在 dev 和prod 配置文件中分别加上
  
        use:[ 'style-loader','css-loader',"postcss-loader"]          
        use:[ MiniCssExtractPlugin.loader,'css-loader',"postcss-loader"]
        
  新建postcss.config.js 配置
  
            module.exports = {
                plugins:{
                    'postcss-cssnext':{}
                }
            }
  #步骤9:开启css modules 开启css作用域 
  
  在dev prod 中修改代码
  
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            modules: true,
                        },
                    },
   
  重启应用，发现样式名变了但是样式不生效，css的引入和使用要改成
      
      import styles from './index.css';
      
      <span className={styles.name}>页面22222</span>
