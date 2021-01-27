/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-27 16:19:16
 */
'use strict';

const Service = require('egg').Service;

class PowAreaService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.SysSecretkey.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.SysSecretkey.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.SysSecretkey.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, description } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysSecretkey.findAndCountAll({
        where: {
          description: {
            $like: `%${description}%`,
          },
          // type: {
          //   $eq: type,
          // },
        },
        offset: _offset,
        limit: pageSize,
      });
    } else {
      result = await ctx.model.SysSecretkey.findAll();
    }
    return result;
  }
}

module.exports = PowAreaService;
