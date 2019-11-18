# react-project

# v1.0.3

# 创建react 项目架子

# 集成模拟数据请求


#步骤1:安装 yarn add -D mock webpack-api-mocker axios

#步骤2:在webpack.dev.js 中修改配置

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
    
   + mock 新建index.js
   
         module.exports = {
          'GET /api/user':{id:1,username:'kenny',sex:6}
          }
#步骤3:开启一个请求（按钮点击）

      axios({
        url:'/api/user',
        method:"get"
    })
    
  + 此时在浏览器控制台就能看到请求了

#步骤4:集成mockJs

  + 在mock/login 中新建 login.js
    const Mock = require('mockjs');

        const data = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1
            }]
        });

        module.exports =data;
       
   + 在mock index.js 中 引入
   
         const login = require('./login/login');

          module.exports = {
              'GET /api/login':login 
          }
   +此时请求数据就可以看到数据了
  
  
  
  
  
  
  
  
  
