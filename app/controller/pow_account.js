/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-26 08:40:41
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 18:14:57
 */
'use strict';

const Controller = require('egg').Controller;

class PowAccountController extends Controller {

  // 登陆成功回调
  async authCallback() {
    const {
      ctx,
      service,
      app,
    } = this;
    console.log('回调');
    console.log(ctx.isAuthenticated());
    if (ctx.isAuthenticated()) {
      const token = app.jwt.sign({ id: ctx.user.id }, app.config.jwt.secret);
      const menus = await service.powAccount.menusByUser(ctx.user.id, [ 1, 2 ]);
      const perms = await service.powAccount.menusByUser(ctx.user.id, [ 3 ]);
      ctx.helper.success({
        ctx,
        res: {
          user: ctx.user,
          token,
          menus,
          perms,
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
    const user = await service.powAccount.login(ctx.request.body);
    if (user) {
      const token = app.jwt.sign({ id: user.id }, app.config.jwt.secret);
      const menus = await service.powAccount.menusByUser(ctx.user.id, [ 1, 2 ]);
      const perms = await service.powAccount.menusByUser(ctx.user.id, [ 3 ]);
      ctx.helper.success({
        ctx,
        res: {
          token,
          user,
          menus,
          perms,
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
