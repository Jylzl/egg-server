/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:49:13
 */
'use strict';

const Service = require('egg').Service;

class PowMenueService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.PowMenu.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.PowMenu.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.PowMenu.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { parentId } = query;
    let result = [];
    result = await ctx.model.PowMenu.findAll({
      where: {
        parentId,
      },
      order: [[ 'order_num', 'ASC' ]],
    });
    return result;
  }

  async tree(query) {
    const { ctx } = this;
    const { lazy, parentId, type } = query;
    let result;
    // 懒加载
    if (lazy === 'true') {
      result = await ctx.model.PowMenu.findAll({
        where: {
          parentId,
          type,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowMenu.findAll({
        where: {
          type,
        },
        order: [[ 'order_num', 'ASC' ]],
        raw: true,
      });
      result = ctx.helper.translateDataToTree(result, 'id', 'parentId', 'children');
    }
    return result;
  }
}

module.exports = PowMenueService;
