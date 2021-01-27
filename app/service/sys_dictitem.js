/**
 * @description: 数据字典
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-21 09:40:32
 */
'use strict';

const Service = require('egg').Service;

class SysDictItemService extends Service {
  async index(query) {
    const { ctx } = this;
    const { dictId, currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysDictItem.findAndCountAll({
        where: {
          dictId,
        },
        offset: _offset,
        limit: pageSize,
      });
    } else {
      result = await ctx.model.SysDictItem.findAll({
        where: {
          dictId,
        },
      });
    }
    return result;
  }

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.SysDictItem.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.SysDictItem.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.SysDictItem.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async check(query) {
    const { ctx } = this;
    const result = await ctx.model.SysDictItem.findAll({
      where: {
        dictId: query.dictId,
        value: query.value,
      },
      attributes: [ 'id' ],
    });
    return result;
  }
}

module.exports = SysDictItemService;
