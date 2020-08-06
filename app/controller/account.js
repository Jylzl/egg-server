/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 18:09:11
 */
'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {


  async authCallback() {
    const {
      ctx,
    } = this;
    console.log('111s');
    console.log(ctx.query);
    console.log(ctx.request.body);
    if (ctx.isAuthenticated()) {
      console.log('2111s');
      ctx.helper.success({
        ctx,
        res: {
          user: ctx.user,
          token: ctx.session.user,
        },
      });
    } else {
      console.log('3111s');
      ctx.helper.success({
        ctx,
        res: {
          user: ctx.user,
          token: ctx.session.user,
          m: '1122',
        },
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
      console.log('登录');
      console.log(token);
      ctx.login(res.id);
      ctx.session.user = token;
      ctx.helper.success({
        ctx,
        res: {
          user: res,
          token,
        },
      });
    } else {
      ctx.helper.fail({
        ctx,
      });
    }
  }

  // 获取权限
  async getPerms() {
    const {
      ctx,
    } = this;
    console.log('获取perms');
    console.log(ctx.user);
    console.log(ctx.session.user);
    ctx.helper.success({
      ctx,
      res: {
        user: ctx.user || {},
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
    ctx.helper.success({
      ctx,
    });
  }
}

module.exports = AccountController;
