/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:57:19
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
        as: 'powUserInf',
      }, {
        model: ctx.model.Role,
        as: 'powRole',
        attributes: [ 'id' ],
      }],
    });
    const userRole = params.roles.map(item => {
      return {
        userId: result.id,
        roleId: item,
      };
    });
    const result1 = await ctx.model.PowUserRole.bulkCreate(userRole);
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
        as: 'powUserInf',
      }, {
        model: ctx.model.Role,
        as: 'powRole',
        attributes: [ 'id' ],
      }],
    });
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.PowUserRole.destroy({
      where: {
        userId: params.id,
      },
    });
    const userRole = params.roles.map(item => {
      return {
        userId: params.id,
        roleId: item,
      };
    });
    const result1 = await ctx.model.PowUserRole.bulkCreate(userRole);
    return result1;
  }
  // 删除用户
  async destroy(params) {
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const del_result = await ctx.model.PowUserRole.destroy({
      where: {
        userId: params.id,
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
    const { currentPage, pageSize, deptId } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.PowUser.findAndCountAll({
        offset: _offset,
        limit: pageSize,
        where: {
          deptId,
        },
        include: [{
          model: ctx.model.PowUserInf,
          as: 'powUserInf',
        }, {
          model: ctx.model.PowRole,
          as: 'powRole',
          attributes: [ 'id' ],
        }],
        attributes: { exclude: [ 'pswd' ] },
        distinct: true,
      });
    } else {
      result = await ctx.model.PowUser.findAll({
        where: {
          deptId,
        },
        include: [{
          model: ctx.model.PowUserInf,
          as: 'powUserInf',
        }, {
          model: ctx.model.PowRole,
          as: 'powRole',
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
        as: 'powUserInf',
      }, {
        model: ctx.model.PowRole,
        as: 'powRole',
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
