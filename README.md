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




