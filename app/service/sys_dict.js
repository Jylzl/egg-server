/**
 * @description: 数据字典
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 13:17:02
 */
'use strict';

const Service = require('egg').Service;

class SysDictService extends Service {
  async index(query) {
    const { ctx } = this;
    const { type, currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysDict.findAndCountAll({
        where: {
          type,
        },
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.SysDict.findAll({
        where: {
          type,
        },
      });
    }
    return result;
  }

  async create(params) {
    const { ctx } = this;
    console.log(params);
    const result = await ctx.model.SysDict.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.SysDict.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.SysDict.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async type(type) {
    const { ctx } = this;
    const result = await ctx.model.SysDict.findOne({
      where: {
        name: type,
      },
      include: [{
        model: ctx.model.SysDictItem,
        as: 'sysDictItem',
        attributes: [ 'id', 'label', 'value' ],
      }],
      distinct: true,
    });
    const res = result.sysDictItem.map(item => {
      if (result.valueType.toLowerCase() === 'number') {
        item.value = Number(item.value);
      } else if (result.valueType.toLowerCase() === 'string') {
        item.value = item.value.toString();
      }
      return item;
    });
    return res;
  }

  async check(name) {
    const { ctx } = this;
    const result = await ctx.model.SysDict.findAll({
      where: {
        name,
      },
      attributes: [ 'id' ],
    });
    return result;
  }
}

module.exports = SysDictService;
