'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  // GET:查询所有
  async login() {
    const {
      ctx,
      service,
    } = this;
    console.log(ctx.request.body);
    const res = await service.account.login(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AccountController;
