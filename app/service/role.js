/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 18:07:35
 */
'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.Role.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.Role.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.Role.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.Role.findAndCountAll({
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.Role.findAll();
    }
    return result;
  }
}

module.exports = RoleService;
