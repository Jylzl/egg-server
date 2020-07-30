/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 16:44:03
 */
'use strict';

const Service = require('egg').Service;

class Userervice extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.User.create(params);
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize } = query;
    console.log(pageSize);
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.User.findAndCountAll({
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      }, {
        attributes: { exclude: [ 'pswd' ] },
      });
    } else {
      result = await ctx.model.User.findAll({
        attributes: { exclude: [ 'pswd' ] },
      });
    }
    return result;
  }

  async find(id) {
    const { ctx } = this;
    const result = await ctx.model.User.findByPk(id, {
      attributes: { exclude: [ 'pswd' ] },
    });
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
