'use strict';

// app/service/account.js
const Service = require('egg').Service;

class AccountService extends Service {
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
}

module.exports = AccountService;
