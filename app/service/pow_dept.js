/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:50:17
 */
'use strict';

const Service = require('egg').Service;

class PowDeptService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.PowDept.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.PowDept.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.PowDept.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { parentId, currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.PowDept.findAndCountAll({
        where: {
          parentId,
        },
        offset: _offset,
        limit: pageSize,
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowDept.findAll({
        where: {
          parentId,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    }
    return result;
  }

  async tree(query) {
    const { ctx } = this;
    const { lazy, parentId } = query;
    let result;
    // 懒加载
    if (lazy === 'true') {
      result = await ctx.model.PowDept.findAll({
        where: {
          parentId,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowDept.findAll({
        raw: true,
        order: [[ 'order_num', 'ASC' ]],
      });
      result = ctx.helper.translateDataToTree(result, 'id', 'parentId', 'children');
    }
    return result;
  }
}

module.exports = PowDeptService;
