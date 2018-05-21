var path = require('path')
var config = require('../config')
// 压缩css 提取单独的文件
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 资源文件的存放路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置
exports.cssLoaders = function (options) {
  options = options || {}
  // css-loader配置
  var cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否最小化
      minimize: process.env.NODE_ENV === 'production',
      // 是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  // 生成各种loader配置，并且配置了extract-text-pulgin
  function generateLoaders (loader, loaderOptions) {
    // 默认是css-loader
    var loaders = [cssLoader]
    // 如果非css，则增加一个处理预编译语言的loader并设好相关配置属性
    // 例如generateLoaders('less')，这里就会push一个less-loader
    // less-loader先将less编译成css，然后再由css-loader去处理css
    // 其他sass、scss等语言也是一样的过程
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 配置extract-text-plugin提取样式
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      // 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理<style>里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // 得到各种不同处理样式的语言所对应的loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 生成处理单独的.css、.sass、.scss等样式文件的规则
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// mock数据中间件
const fs = require('fs');
const vm = require('vm');
exports.mock = function(req, res, next){
  // 支持热更新
  let mockFilter = parseConfig(path.join(__dirname, '../config/mock-filter.json'));

  const url = req.originalUrl;
  // 如果配置略过mock, 或者关闭所有mock则直接跳过
  if(mockFilter['IS_CLOSE_ALL_MOCK'] || mockFilter[url]) return next();

  const mockPath = path.join(__dirname, '../mock', url + '.json');
  const data = parseConfig(mockPath);
  try {
    if(JSON.stringify(data) !== '{}'){
      res.json(data);
      return;
    }
  } catch (error) {}

  next();
};


/**
 * 使用vm执行代码，解析json文件
 * @param filePath
 * @returns {{}}
 */
function parseConfig (filePath) {
  let content;
  try {
    content = fs.readFileSync(filePath);
  } catch (e) {
    return {};
  }
  const code = '(' + content + ')';
  const sandbox = {};
  try {
    return vm.runInThisContext(code, sandbox, {
      filename: filePath,
      displayErrors: false,
      timeout: 1000
    });
  } catch (e) {
    console.error(e);
    return {};
  }
}
