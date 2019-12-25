/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-25 08:46:06
 */
'use strict';

const Service = require('egg').Service;

class Userervice extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.User.create(params);
    return result;
  }

  async list(query) {
    const { ctx } = this;
    const result = await ctx.model.User.findAll(query);
    return result;
  }

  async find(id) {
    const { ctx } = this;
    const result = await ctx.model.User.findByPk(id);
    if (!result) {
      ctx.throw(404, 'user not found');
    } else {
      return result;
    }
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    const { ctx } = this;
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      ctx.throw(500, 'remote response error');
    }
  }
}

module.exports = Userervice;
