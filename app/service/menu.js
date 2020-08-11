/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 09:41:01
 */
'use strict';

const Service = require('egg').Service;

class MenueService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.Menu.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.Menu.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.Menu.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { parent_id } = query;
    let result = [];
    result = await ctx.model.Menu.findAll({
      where: {
        parent_id,
      },
    });
    return result;
  }

  async tree(query) {
    const { ctx } = this;
    const { lazy, parent_id } = query;
    let result;
    // 懒加载
    if (lazy === 'true') {
      result = await ctx.model.Menu.findAll({
        where: {
          parent_id,
        },
      });
    } else {
      result = await ctx.model.Menu.findAll({ raw: true });
      result = ctx.helper.translateDataToTree(result, 'id', 'parent_id', 'children');
    }
    return result;
  }
}

module.exports = MenueService;
