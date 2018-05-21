var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // webpack入口文件
    app: './src/main.js'
  },
  // webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径（例如部署到cdn就可以设置'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块resolve的规则
  resolve: {
    // 别名，方便引用模块，例如有了别名之后
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // fix vue的package.json里面的main的指引
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      {// 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {// 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {// 编译时，对代码规范进行检查
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          // 不符合Eslint规则时只警告(默认运行出错)
          // emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }
    ]
  }
}
