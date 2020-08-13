/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 14:38:53
 */
'use strict';

const Controller = require('egg').Controller;

const createRule = {
  name: 'string',
  pswd: 'string',
  phone: 'string',
};

class UserController extends Controller {
  // GET:查询所有
  async index() {
    const { ctx, service } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.user.index(query);
    ctx.helper.success({ ctx, res });
  }

  // GET:查询指定id
  async show() {
    const { ctx, service } = this;
    const res = await service.user.find(ctx.helper.parseInt(ctx.params.id));
    ctx.helper.success({ ctx, res });
  }

  // POST:创建
  async create() {
    const { ctx, service } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    console.log(ctx.request.body);
    ctx.validate(createRule, ctx.request.body);
    const res = await service.user.create(ctx.request.body);
    ctx.helper.success({ ctx, res });
  }

  // PUT:修改指定id
  async update() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.user.update(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // DELETE:删除指定id
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.helper.parseInt(ctx.params.id);
    const res = await service.user.del(id);
    await ctx.service.user.del(id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
