// accounting插件
import accounting from "accounting";

/**
 * 格式化数字
 * @param {Number} num 格式化前数字
 * @param {Number} prec 保留小数点位数
 * @param {String} posi 每3位的分隔符，默认为,
 */
function formatNumber(num, prec, posi = ',') {
  return accounting.formatNumber(num, prec, posi);
}

/**
 * 解析数字，将格式化后的数字还原为Number类型
 * @param {String} formattedNum 格式化后数字
 */
function unFormatNumber(formattedNum) {
  return accounting.unformat(formattedNum);
}

/**
 * 保留小数点
 * @param {Number} num 数字
 * @param {Number} prec 小数点位数
 */
function toFixed(num, prec) {
  return accounting.toFixed(num, prec);
}

/**
 * 格式化金钱
 * @param {Number} num 数字
 * @param {String} sign 金钱符号，默认为￥
 * @param {Number} prec 保留小数点位数，默认为2
 */
function formatMoney(num, sign = '￥', prec = 2) {
  return accounting.formatMoney(num, sign, prec);
}

/**
 * 左补零
 * @param {String} str 待补零字符串
 */
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * 日期格式化
 * @param {Object} date 待格式化日期，可以是Date类型，也可以是时间戳（支持10位和13位），还可以是时间戳字符串（支持10位和13位）
 * @param {String} fmt 格式化方式，默认为：yyyy-MM-dd hh:mm:ss
 */
function formatDate(dateObj, fmt) {
  let date;
  if (dateObj instanceof Date) {
    date = dateObj;
  } else if (typeof (dateObj) === 'number') {
    if (dateObj.toString().length === 13) {
      date = new Date(dateObj);
    } else if (dateObj.toString().length === 10) {
      date = new Date(dateObj * 1000);
    } else {
      return '';
    }
  } else if (typeof (dateObj) === 'string') {
    if (dateObj.length == 13) {
      date = new Date(parseInt(dateObj));
    } else if (dateObj.length == 10) {
      date = new Date(parseInt(dateObj) * 1000);
    }
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

export default {
  formatNumber,
  unFormatNumber,
  toFixed,
  formatMoney,
  formatDate
};
