/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 11:56:05
 * @LastAuthor: lizlong
 * @lastTime: 2021-02-02 10:10:04
 */
'use strict';

// app/extend/helper.js
const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  // 转换数字类型
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
  // 数组转树结构数组
  translateDataToTree(sNodes, key, parentKey, childKey) {
    let i;
    let l;
    key = key || 'id';
    parentKey = parentKey || 'pId';
    childKey = childKey || 'children';
    if (!key || key === '' || !sNodes) return [];
    if (Object.prototype.toString.call(sNodes) === '[object Array]') {
      const r = [];
      const tmpMap = [];
      for (i = 0, l = sNodes.length; i < l; i++) {
        tmpMap[sNodes[i][key]] = sNodes[i];
      }
      for (i = 0, l = sNodes.length; i < l; i++) {
        if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] !== sNodes[i][parentKey]) {
          if (!tmpMap[sNodes[i][parentKey]][childKey]) {
            tmpMap[sNodes[i][parentKey]][childKey] = [];
          }
          tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
        } else {
          r.push(sNodes[i]);
        }
      }
      return r;
      // eslint-disable-next-line no-else-return
    } else {
      // eslint-disable-next-line array-bracket-spacing
      return [sNodes];
    }
  },
  // 处理成功响应
  success({ ctx, res = null, msg = 'success' }) {
    ctx.body = {
      code: 200,
      data: res,
      msg,
    };
    ctx.status = 200;
  },
  // 处理错误响应
  error({ ctx, res = null, msg = 'err' }) {
    ctx.body = {
      code: 500,
      data: res,
      msg,
    };
    ctx.status = 200;
  },
  // 处理失败响应
  fail({ ctx, res = null, msg = 'fail' }) {
    ctx.body = {
      code: -200,
      data: res,
      msg,
    };
    ctx.status = 200;
  },
  // token信息无效
  noPermission({ ctx, msg = 'invalid token' }) {
    ctx.body = {
      code: 401,
      msg,
    };
    ctx.status = 200;
  },
  // 时间格式化
  moment(date, type) {
    let _date = null;
    if (date === null || date === undefined || date === '') {
      _date = date;
    } else {
      _date = moment(new Date(date.replace(/(^\s*)|(\s*$)/g, ''))).format(type || 'YYYY-MM-DD HH:mm:ss');
    }
    return _date;
  },
  // url处理，相对路径转绝对路径
  urlSplicing(baseUrl, url) {
    let _url = null;
    // 如果是绝对路径直接返回
    if (url === null || url === undefined || url === '' || url.startsWith('http')) {
      _url = url;
    } else {
      _url = new URL(url, baseUrl).href;
    }
    return _url.replace(':80/', '/');
  },
  // url处理，比较两个url是否一致
  urlCompare(url1, url2, str) {
    const _url1 = new URL(url1);
    const _url2 = new URL(url2);
    return _url1[str] === _url2[str];
  },
  // 模板处理
  render(template, context) {
    return template.replace(/\$\{(\w+)\}/g, (match, key) => context[key.trim()]);
  },
};
