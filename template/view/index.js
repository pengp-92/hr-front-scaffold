const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// 支持的视图类型
const types = ['l', 'ln', 'a', 'e', 'd'];
// mock数据目录
const mockRoot = path.join(process.cwd(), '/mock');
// 视图目录
const viewRoot = path.join(process.cwd(), '/src/views');

/**
 * 显示错误日志
 * @param {String} cnt 日志内容
 */
function showError(cnt) {
  console.log(chalk.red(cnt));
}

/**
 * 显示日志信息
 * @param {String} cnt 日志内容
 */
function showInfo(cnt) {
  console.log(chalk.yellow(cnt));
}

/**
 * 检查JSON数据格式
 * @param {JSON} jsonData 模拟JSON数据
 * @param {String} type 模块类型
 */
function checkJson(jsonData, type) {
  if (!jsonData) {
    return false;
  }

  // 检查JSON数据是否包含data
  if (!jsonData.data) {
    showError(`模拟数据没有data属性的值`);
    return false;
  }

  // 根据当前模块类型，检查模拟数据格式
  switch (type) {
    case 'l':
      // 判断总条数total
      if (!jsonData.data.total || isNaN(jsonData.data.total)) {
        showError(`模拟数据data.total错误`);
        return false;
      }

      // 判断分页pageable
      if (!jsonData.data.pageable) {
        showError(`模拟数据data.pageable错误`);
        return false;
      }

      // pageable中的size，page
      if (!jsonData.data.pageable.size || isNaN(jsonData.data.pageable.size)) {
        showError(`模拟数据data.pageable.size错误`);
        return false;
      }

      if (!jsonData.data.pageable.page || isNaN(jsonData.data.pageable.page)) {
        showError(`模拟数据data.pageable.page错误`);
        return false;
      }

      // 判断列表内容content
      if (!jsonData.data.content || jsonData.data.content.length == 0) {
        showError(`模拟数据data.content错误`);
        return false;
      }

      break;
    case 'ln':
      // 判断列表内容
      if (!jsonData.data || jsonData.data.length == 0) {
        showError(`模拟数据data值错误`);
        return false;
      }
      break;
    default:
      // 判断数据内容
      if (!jsonData.data || jsonData.data.length == 0) {
        showError(`模拟数据data值错误`);
        return false;
      }
      break;
  }

  return true;
}

/**
 * 根据模块类型获取生成代码要使用的JSON数据
 * @param {JSON} jsonData 模拟JSON数据
 * @param {String} type 模块类型
 */
function getJson(jsonData, type) {
  switch (type) {
    case 'l':
      return jsonData.data.content[0];
    case 'ln':
      return jsonData.data[0];
    default:
      return jsonData.data;
  }
}

module.exports = function (name, type, data) {
  // 检查参数
  if (!name || !type || !data) {
    showError(`参数缺失`);
    return;
  }

  // 检查type
  if (types.indexOf(type) < 0) {
    showError(`暂不支持当前类型：${type}`);
    return;
  }

  // 检查data
  let dataJson = '';
  const dataPath = path.join(mockRoot, path.dirname(data), `${path.basename(data)}.json`);
  try {
    dataJson = JSON.parse(fs.readFileSync(dataPath));
    if (!checkJson(dataJson, type)) {
      return;
    }
  } catch (e) {
    showError(`数据模拟文件不存在或内容不是JSON格式：${dataPath}`);
    return;
  }

  // 开始生成
  // 检查模块目录是否存在，不存在则创建
  const viewPath = path.join(viewRoot, name);
  if (!fs.existsSync(viewPath)) {
    // 创建目录
    try {
      fs.mkdirSync(viewPath);
      showInfo(`视图目录创建成功：${viewPath}`);
    } catch (e) {
      showError(`创建视图目录失败：${e}`);
      return;
    }
  }

  // 读取JSON数据
  const jsonTemplate = getJson(dataJson, type);
  for (let key in jsonTemplate) {
    console.log(`读取到的数据key:${key}，value:${jsonTemplate[key]}，type:${typeof (jsonTemplate[key])}`);
  }
}
