/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 12:04:56
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
    } = this;
    if (ctx.isAuthenticated()) {
      const res = ctx.user;
      ctx.helper.success({
        ctx,
        res,
      });
    } else {
      ctx.helper.error({
        ctx,
      });
    }
  }

  // 退出登录
  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    if (ctx.isAuthenticated()) {
      ctx.helper.error({
        ctx,
      });
    } else {
      ctx.helper.success({
        ctx,
      });
    }
  }
}

module.exports = AccountController;
