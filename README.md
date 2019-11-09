# react-project

# v1.0.1

# 创建react 项目架子

# 添加路由  react-router-dom

+ 使用的话 推荐看文章 https://www.jianshu.com/p/8954e9fb0c7e

#步骤1:

    安装 yarn add react-router-dom --dev
    
#步骤2:
    在src 目录下，新建 Router.js

    import React from 'react';
    import {HashRouter,Route,Switch} from 'react-router-dom';

    import Home from '@/page1';
    import Page2 from '@/page2';

    const BasicRoute =() => {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Home} ></Route>
                    <Route exact path='/page1' component={Home} ></Route>
                    <Route exact path='/page2' component={Page2} ></Route>
                </Switch>
            </HashRouter>
        )
    }

    export default BasicRoute;
#步骤3:
  在index.js 文件下引入
  
  import React from 'react';
  import ReactDOM from 'react-dom'
  import AppDemo from './App';
  import BasicRoute from './Router';

  ReactDOM.render(
      <BasicRoute />,
      document.getElementById('root')
    );
此时，启动应用，可以切换路由查看效果
