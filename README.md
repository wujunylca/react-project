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
     
#步骤3:
   


  
  
  
  
  
  
  
  
