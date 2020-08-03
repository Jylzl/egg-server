/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-03 15:16:06
 */
'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {


  async authCallback() {
    const {
      ctx,
    } = this;
    if (ctx.isAuthenticated()) {
      ctx.helper.success({
        ctx,
        res: {
          user: ctx.user,
          token: ctx.session.user,
        },
      });
    } else {
      ctx.helper.error({
        ctx,
      });
    }
  }

  // 登录
  async login() {
    const {
      ctx,
      service,
      app,
    } = this;
    const res = await service.account.login(ctx.request.body);
    if (res) {
      const token = app.jwt.sign({ id: res.id }, app.config.jwt.secret);
      ctx.body = {
        code: 200,
        data: res,
        msg: 'success',
        token,
      };
      ctx.status = 200;
    } else {
      ctx.helper.error({
        ctx,
      });
    }
  }

  // 获取权限
  async getPerms() {
    const {
      ctx,
    } = this;
    ctx.helper.success({
      ctx,
      res: {
        user: ctx.user,
        token: ctx.session.user,
        menus: [],
        perms: [],
      },
    });
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
