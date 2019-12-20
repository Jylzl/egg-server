/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 13:00:52
 */
'use strict';

const Service = require('egg').Service;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class Userervice extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://cnodejs.org/api/v1';
  }

  async create(params) {
    // 调用 CNode V1 版本 API
    const result = await this.ctx.model.User.create(params);
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result;
  }

  async list(query) {
    // 调用 CNode V1 版本 API
    console.log(this.ctx.model.User);
    const result = await this.ctx.model.User.findAll(query);
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result;
  }

  async find(id) {
    // 调用 CNode V1 版本 API
    console.log(this.ctx.model.User);
    const result = await this.ctx.model.User.findByPk(toInt(id));
    // const result = await this.ctx.curl(`${this.root}/topics`, {
    //   method: 'get',
    //   data: params,
    //   dataType: 'json',
    //   contentType: 'json',
    // });
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result);
    // 返回创建的 topic 的 id
    return result;
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}

module.exports = Userervice;
