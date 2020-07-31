/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 11:56:05
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 08:40:38
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
      code: 201,
      data: res,
      msg,
    };
    ctx.status = 200;
  },
  formatTime() {
    return '1';
  },
};
