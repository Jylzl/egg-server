/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 12:58:49
 */
'use strict';

const Controller = require('egg').Controller;

class PowAccountController extends Controller {

  // 登陆成功回调
  async authCallback() {
    const {
      ctx,
      app,
    } = this;
    console.log('回调');
    console.log(ctx.isAuthenticated());
    if (ctx.isAuthenticated()) {
      const token = app.jwt.sign({ id: ctx.user.id }, app.config.jwt.secret);
      ctx.helper.success({
        ctx,
        res: {
          user: ctx.user,
          token,
        },
      });
    } else {
      ctx.helper.fail({
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
    const res = await service.powAccount.login(ctx.request.body);
    if (res) {
      const token = app.jwt.sign({ id: res.id }, app.config.jwt.secret);
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
      ctx, service,
    } = this;
    const menus = await service.powAccount.menusByUser(ctx.user.id, [ 1, 2 ]);
    const perms = await service.powAccount.menusByUser(ctx.user.id, [ 3 ]);
    ctx.helper.success({
      ctx,
      res: {
        user: ctx.user || {},
        menus,
        perms,
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

  // 密码校验
  async checkPassword() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.powAccount.login(ctx.request.body);
    return res;
  }
}

module.exports = PowAccountController;
