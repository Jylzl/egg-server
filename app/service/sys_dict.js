/**
 * @description: 数据字典
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-22 14:41:14
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
    console.log('-----------------');
    console.log(type);
    const { ctx } = this;
    const result = await ctx.model.SysDict.findOne({
      where: {
        name: type,
      },
      include: [{
        model: ctx.model.SysDictItem,
        attributes: [ 'id', 'label', 'value' ],
      }],
      distinct: true,
    });
    console.log('result.type=================');
    console.log(result.type);
    const res = result.sys_dict_items.map(item => {
      if (result.value_type.toLowerCase() === 'number') {
        item.value = Number(item.value);
      } else if (result.value_type.toLowerCase() === 'string') {
        item.value = item.value.toString();
      }
      return item;
    });
    return res;
  }
}

module.exports = SysDictService;