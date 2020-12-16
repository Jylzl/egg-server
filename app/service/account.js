/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 15:07:27
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:24:22
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
    const result = await ctx.model.UserAuth.findOne({
      where: {
        uid: params.id,
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
    return result;
  }

  async authCallback() {
    const {
      ctx,
    } = this;
    return ctx.session.token;
  }

  async menusByUser() {
    const {
      ctx,
    } = this;
    let result = await ctx.model.Menu.findAll({
      where: {
        type: [ 1, 2 ],
      },
      raw: true,
    });
    result = ctx.helper.translateDataToTree(result, 'id', 'parent_id', 'children');
    return result;
  }

  async permsByUser() {
    const {
      ctx,
    } = this;
    const result = await ctx.model.Menu.findAll({
      where: {
        type: [ 3 ],
      },
      raw: true,
    });
    return result;
  }
}

module.exports = AccountService;
