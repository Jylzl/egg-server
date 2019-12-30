/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-30 11:05:03
 */
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

  async authCallback() {
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
