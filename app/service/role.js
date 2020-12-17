/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 15:46:15
 */
'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.Role.create(params);
    const role_menu = params.menus.map(item => {
      return {
        role_id: result.id,
        menu_id: item,
      };
    });
    const result1 = await ctx.model.RoleMenu.bulkCreate(role_menu);
    return result1;
  }

  async update(params) {
    const { ctx } = this;
    // 修改角色信息
    // eslint-disable-next-line no-unused-vars
    const result = await ctx.model.Role.update(params, {
      where: {
        id: params.id,
      },
    });
    // 修改角色对应菜单权限
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.RoleMenu.destroy({
      where: {
        role_id: params.id,
      },
    });
    const role_menu = params.menus.map(item => {
      return {
        role_id: params.id,
        menu_id: item,
      };
    });
    const result1 = await ctx.model.RoleMenu.bulkCreate(role_menu);
    return result1;
  }

  async destroy(params) {
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.RoleMenu.destroy({
      where: {
        role_id: params.id,
      },
    });
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
        include: [{
          model: ctx.model.Menu,
          attributes: [ 'id' ],
        }],
      });
    } else {
      result = await ctx.model.Role.findAll();
    }
    return result;
  }
}

module.exports = RoleService;
