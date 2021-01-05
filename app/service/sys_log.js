/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-05 14:59:25
 */
'use strict';

const Service = require('egg').Service;

class PowAreaService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.SysLog.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.SysLog.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.SysLog.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, title } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysLog.findAndCountAll({
        where: {
          title: {
            $like: `%${title}%`,
          },
        },
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
        order: [[ 'created_at', 'DESC' ]],
      });
    } else {
      result = await ctx.model.SysLog.findAll();
    }
    return result;
  }
}

module.exports = PowAreaService;
