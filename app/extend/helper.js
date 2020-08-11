/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 11:56:05
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 09:42:53
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
      return [ sNodes ];
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
  formatTime() {
    return '1';
  },
};
