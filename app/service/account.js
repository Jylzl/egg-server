/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 15:07:27
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-03 18:30:20
 */
'use strict';

// app/service/account.js
const Service = require('egg').Service;

class AccountService extends Service {
  // 根据第三方授权信息查询用户
  async tLogin(params) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.UserAuths.findOne({
      where: {
        uid: params.uid,
        provider: params.provider,
      },
      // include: [{ model: ctx.model.User, attributes: { exclude: [ 'pswd' ] } }],
    });
    const result1 = await ctx.model.User.findOne({
      where: {
        id: result.user_id,
      },
      attributes: { exclude: [ 'pswd' ] },
    });
    if (!result1) {
      ctx.throw(403, 'Wrong user name or password');
    } else {
      return result1;
    }
  }

  // 账户密码登录
  async login(params) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.User.findOne({
      where: {
        name: params.username,
        pswd: params.password,
      },
      attributes: { exclude: [ 'pswd' ] },
    });
    if (!result) {
      ctx.throw(403, 'Wrong user name or password');
    } else {
      return result;
    }
  }

  async authCallback() {
    const {
      ctx,
    } = this;
    return ctx.session.token;
  }
}

module.exports = AccountService;
