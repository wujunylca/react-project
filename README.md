# react-project

# v1.0.4

# 开始写业务代码

# 集成antd


#步骤1:安装 yarn less less-loader
    在dev.js 中加入
    
      {
                test:/\.(css|less)$/,
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
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    },
                    "postcss-loader"
                ]
            }

#步骤2:安装antd 

***** 踩坑选择******* 
之前开启了css-modules 导致样式永远不生效。

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
                            // exclude
                        }
                    ]
      手动引入样式，看到效果了。
     
#步骤3:按需加载antd 样式

安装  babel-plugin-import 
 在babelrc 里面配置
 
             ["import", {
                "libraryName": "antd",
                "libraryDirectory": "lib",
                "style": "css"
              }],
   
******采坑 **** styles：true 配置会出错，虽然不知道为什么 ，可能和配置的libraryDirectory 有关系，有待研究



  
  
  
  
  
  
  
  
