/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 12:45:53
 */
'use strict';

const Service = require('egg').Service;

class PowUserervice extends Service {
  // 创建用户
  async create(params) {
    const { ctx } = this;
    console.log(params);
    const result = await ctx.model.PowUser.create(params, {
      include: [{
        model: ctx.model.UserInf,
      }, {
        model: ctx.model.Role,
        attributes: [ 'id' ],
      }],
    });
    const user_role = params.roles.map(item => {
      return {
        user_id: result.id,
        role_id: item,
      };
    });
    const result1 = await ctx.model.PowUserRole.bulkCreate(user_role);
    return result1;
  }
  // 更新用户
  async update(params) {
    const { ctx } = this;
    console.log(params);
    // eslint-disable-next-line no-unused-vars
    const result = await ctx.model.PowUser.update(params, {
      where: {
        id: params.id,
      },
      include: [{
        model: ctx.model.UserInf,
      }, {
        model: ctx.model.Role,
        attributes: [ 'id' ],
      }],
    });
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.PowUserRole.destroy({
      where: {
        user_id: params.id,
      },
    });
    const user_role = params.roles.map(item => {
      return {
        user_id: params.id,
        role_id: item,
      };
    });
    const result1 = await ctx.model.PowUserRole.bulkCreate(user_role);
    return result1;
  }
  // 删除用户
  async destroy(params) {
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.PowUserRole.destroy({
      where: {
        user_id: params.id,
      },
    });
    const result = await ctx.model.PowUser.destroy({
      where: {
        id: params.id,
      },
      include: [{
        model: ctx.model.UserInf,
      }, {
        model: ctx.model.Role,
        attributes: [ 'id' ],
      }],
    });
    return result;
  }
  // 查询所有用户
  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, dept_id } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.PowUser.findAndCountAll({
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
        where: {
          dept_id,
        },
        include: [{
          model: ctx.model.PowUserInf,
        }, {
          model: ctx.model.PowRole,
          attributes: [ 'id' ],
        }],
        attributes: { exclude: [ 'pswd' ] },
        distinct: true,
      });
    } else {
      result = await ctx.model.PowUser.findAll({
        where: {
          dept_id,
        },
        include: [{
          model: ctx.model.PowUserInf,
        }, {
          model: ctx.model.PowRole,
          attributes: [ 'id' ],
        }],
        attributes: { exclude: [ 'pswd' ] },
        distinct: true,
      });
    }
    return result;
  }
  // 查询指定用户
  async find(id) {
    const { ctx } = this;
    const result = await ctx.model.PowUser.findByPk(id, {
      include: [{
        model: ctx.model.PowUserInf,
      }, {
        model: ctx.model.PowRole,
        attributes: [ 'id' ],
      }],
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

module.exports = PowUserervice;
