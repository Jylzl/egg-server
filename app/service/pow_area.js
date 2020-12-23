/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 16:41:38
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
    const { parent_id, currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.PowArea.findAndCountAll({
        where: {
          parent_id,
        },
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowArea.findAll({
        where: {
          parent_id,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    }
    return result;
  }

  async tree(query) {
    const { ctx } = this;
    const { lazy, parent_id } = query;
    let result;
    // 懒加载
    if (lazy === 'true') {
      result = await ctx.model.PowArea.findAll({
        where: {
          parent_id,
        },
        order: [[ 'order_num', 'ASC' ]],
      });
    } else {
      result = await ctx.model.PowArea.findAll({
        raw: true,
        order: [[ 'order_num', 'ASC' ]],
      });
      result = ctx.helper.translateDataToTree(result, 'id', 'parent_id', 'children');
    }
    return result;
  }
}

module.exports = PowAreaService;
