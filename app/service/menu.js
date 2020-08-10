/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-10 18:32:14
 */
'use strict';

const Service = require('egg').Service;

class Menuervice extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.Menu.create(params);
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
    if (lazy) {
      result = await ctx.model.Menu.findAll({
        where: {
          parent_id,
        },
      });
    } else {
      result = await ctx.model.Menu.findAll();
      result = ctx.helper.translateDataToTree(result, 'id', 'parent_id');
    }
    return result;
  }
}

module.exports = Menuervice;
