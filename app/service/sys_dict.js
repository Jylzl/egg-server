/**
 * @description: 数据字典
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-23 17:40:19
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
        offset: _offset,
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
    let res = [];
    if (result) {
      res = result.sysDictItem.map(item => {
        if (result.valueType.toLowerCase() === 'number') {
          item.value = Number(item.value);
        } else if (result.valueType.toLowerCase() === 'string') {
          item.value = item.value.toString();
        }
        return item;
      });
    }
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
