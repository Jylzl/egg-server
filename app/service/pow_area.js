/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:50:01
 */
'use strict';

const Service = require('egg').Service;

class PowAreaService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.PowArea.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.PowArea.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.PowArea.destroy({
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
      result = await ctx.model.PowArea.findAndCountAll({
        where: {
          parentId,
        },
        offset: _offset,
        limit: pageSize,
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowArea.findAll({
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
      result = await ctx.model.PowArea.findAll({
        where: {
          parentId,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowArea.findAll({
        raw: true,
        order: [[ 'order_num', 'ASC' ]],
      });
      result = ctx.helper.translateDataToTree(result, 'id', 'parentId', 'children');
    }
    return result;
  }
}

module.exports = PowAreaService;
