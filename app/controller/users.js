/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 14:17:02
 */
'use strict';

const Controller = require('egg').Controller;

const createRule = {
  user_name: 'string',
  user_pwd: 'string',
  user_phone: 'string',
};

class UserController extends Controller {
  // GET:查询所有
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.user.list(query);
  }

  // GET:查询指定id
  async show() {
    const ctx = this.ctx;
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: await ctx.service.user.find(ctx.helper.parseInt(ctx.params.id)),
    };
  }

  // POST:创建
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    const user = await ctx.service.user.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  // PUT:修改指定id
  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await ctx.service.user.update({ id, updates: body });
  }

  // DELETE:删除指定id
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.user.del(id);
    ctx.status = 200;
  }
}

module.exports = UserController;
