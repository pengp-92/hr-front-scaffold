<<<<<<< HEAD
# hr-front-scaffold
昊润前端脚手架框架
=======
# 基于vuejs单页面管理后台应用


> 参考资料
nodesjs package.json
webpack
npm包怎么管理 https://www.npmjs.com/search?q=webpack
vuejs 文档   https://cn.vuejs.org/v2/guide/
element 框架 http://element.eleme.io/#/zh-CN/component/installation

## package包的管理
后续有需要保存包的

npm i autoprefixer --save

## 快速开始

> 本地调试开发
```bash
$ npm install
$ npm run dev
```

> 编译推送环境
```bash
$ npm install
$ npm run build
```

## 项目目录介绍

```
├── .babelrc              babel转义配置
├── .editorconfig         编辑格式配置
├── .gitignore            git管理忽略
├── .postcssrc.js         postcss配置
├── index.html            页面基础layout
├── package.json          npm包管理文档
├── build                 webpack打包配置管理
|   ├── build.js          线上打包配置
│   ├── check-versions.js	检车依赖node,npm版本号
│   ├── dev-client.js     本地开发连接客户端
│   ├── dev-server.js     本地开发服务
│   ├── utils             打包常用工具函数
│   ├── vue-loader.conf   vue-loader配置
│   ├── webpack.base.conf webpack基础配置
│   ├── webpack.dev.conf  webpack dev配置
│   └── webpack.prod.conf webpack prod配置
├── config                配置相关
|   ├── dev.env.js        dev环境配置
|   ├── index.js          webpack配置文件
|   ├── mock-filter.js    mock数据过滤接口配置
|	  └── prod.env.js       prod环境配置
├── mock                  mock数据
│   └── user
│       └── listpage.json
├── static                不需要编译涉及的静态资源
│   └── ...
└── src                   前端项目主要入口
    ├── components        公共vue组件
    │   └── breadcrumb
    │         └── index.vue
    ├── imgs	   		      公共图片资源
    │    └── element-logo
    ├── router            vue路由相关
    │   └── index.js
    ├── store             vuex相关
    │   └── index.js
    ├── styles            公共样式相关
    │   └── index.sass
    ├── views             页面相关
    │   └── 页面名称
    │         ├── components  页面级组件
    │         │       └── index.vue
    │         ├── imgs        页面级imgs
    │         │     └── xxx.jpg
    │         └── 页面.vue
    ├── app.vue           vue页面layout
    └── main.js           vue打包入口

```

##  webpack配置使用

具体参考文件
```
/build/webpack.base.conf.js
/build/webpack.dev.conf.js
/build/webpack.prod.conf.js
/config/dev.env.js
/config/index.js
/config/prod.env.js
```

## 如何新建一个页面

### 1. 建立页面级vue文件等资源 例如创建一个名为search的搜索页面
在/views文件下创建以下文件，即所有该页面需要的资源都只放在/views/search/文件夹下
```
    ├── views
    │   └── search
    │         ├── components
    │         │       └── searchTop.vue
    │         ├── imgs
    │         │     └── search.jpg
    │         └── index.vue
```
### 2. 建立该页面所对应的路由 如果该路由需要是'/search'
在routes里面首页下方添加
```
{
  path: 'search',
  name: '搜索页',
  component: () => import('@/views/search/index')
}
```
### 3. 在左侧导航里面添加跳转入口
在/views/layout/compontents/sidebar.vue里面添加
```
<el-menu-item index="search">
  <i class="el-icon-search"></i>进度条
</el-menu-item>
```


##  本地mock数据与代理后端接口联调

### 1.本地mock
例如访问路径 /api/demo
则在以下mock文件夹下面配置对应mock数据即可访问
> 特性: mock文件夹下都支持热更新，即不需要重启本地服务器，随时添加修改及时生效
```
 mock
  └── api
      └── demo.json
```

默认所有接口都会去读取本地是否有对应的json文件，如何取消访问本地mock数据
在config/mock-filter.json里面配置需要过滤掉的接口为ture
同样支持实时更新，随时修改随时生效
```
{
  "/api/demo":true
}
```
也可以设置一个总开关，关闭所有的mock
```
{
  "IS_CLOSE_ALL_MOCK":true
}
```

### 2.利用代理proxy中间件代理到其他服务器接口
例如需要将/v2开头的请求代理到豆瓣网公开api
则在/config/index里面配置
```
dev: {
    proxyTable: {
      '/v2': {
        target: 'https://api.douban.com',
        changeOrigin: true
      }
    }
  }
```
本地访问/v2/book/1220562
即可代理到豆瓣网服务器访问公开的api



##  编译之后的静态资源发布CDN或者放到其他域名的服务器
修改/config/index.js 例如cdn服务器域名为cdn.haorun.com
```
build: {
  assetsPublicPath: '//cdn.haorun.com',
  assetsSubDirectory: 'static',
}
```
生成的资源路径为`//cdn.haorun.com/static/js/app.f9e3a083456561490777.js`


##  编译后的入口文件html与后端结合，
例如后端java项目需要.jsp格式文件
指定/config/index.js
```
build: {
  index: path.resolve(__dirname, '../dist/index.html')
}
```

##  编译之后的部署
所有编译之后的文件生成在
```
build: {
   assetsRoot: path.resolve(__dirname, '../dist'),
}
```
具体目录为
```
└── dist              打包生成文件夹
    ├── static        所有的静态资源
    │   └── ...
    └──index.jsp      入口文件
```
接下来即可以根据需要移动文件到指定位置


## 前端资源管理
一定区分全局与页面级

全局组件划分在/src/compoents

## vue开发必须掌握
官方文档基本必须掌握 https://cn.vuejs.org/v2/guide/events.html

思路转变 不在操作dom 而是操作数据

重点掌握
模版语法 主要就是分隔符
计算属性 数据无法直接使用需要计算
样式绑定 无须操作dom 和数据绑定
条件列表渲染
事件绑定
表单输入
组件
vuex
dispatch -> action -> mutaions -> commit -> state


调试
chrome devtools

## eslint
基于VUE的规则：https://blog.csdn.net/qq_30817073/article/details/78043553
普通JS规则：http://eslint.cn/
>>>>>>> 08148bdd92da9a808a14a2632107670cf8ac9a00
