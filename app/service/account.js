/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 15:07:27
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 11:49:50
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
    console.log(params);
    const result = await ctx.model.UserAuths.findOne({
      where: {
        uid: params.uid,
        provider: params.provider,
      },
      include: [{ model: ctx.model.User, attributes: { exclude: [ 'pswd' ] } }],
    });
    if (!result) {
      ctx.throw(403, 'Wrong user name or password');
    } else {
      return result;
    }
  }
  async login(params) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.User.findOne({
      where: {
        name: params.user,
        pswd: params.pswd,
      },
    });
    if (!result) {
      ctx.throw(401, 'Wrong user name or password');
    } else {
      return result;
    }
  }

  async authCallback() {
    const {
      ctx,
    } = this;
    console.log('=============================================1');
    return ctx.user;
  }
}

module.exports = AccountService;
