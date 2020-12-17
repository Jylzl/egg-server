/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 15:07:27
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 18:43:24
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
      include: {
        model: ctx.model.UserInf,
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
      include: {
        model: ctx.model.UserInf,
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

  async menusByUser(id) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.User.findByPk(id, {
      include: [{
        model: ctx.model.UserInf,
        // as: 'ui',
      }, {
        model: ctx.model.Role,
        // as: 'r',
        attributes: [ 'id' ],
        include: [{
          model: ctx.model.Menu,
          // as: 'm',
          where: {
            type: [ 1, 2 ],
          },
          raw: true,
        }],
        raw: true,
      }],
      // as: 'u',
      attributes: { exclude: [ 'pswd' ] },
      // attributes: [ ctx.Sequelize.col('userinf.role.menu') ],
      // attributes: [ 'u.r.m' ],
    });
    // result = ctx.helper.translateDataToTree(result, 'id', 'parent_id', 'children');
    return result;
  }

  async permsByUser(id) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.User.findByPk(id, {
      include: [{
        model: ctx.model.UserInf,
      }, {
        model: ctx.model.Role,
        attributes: [ 'id' ],
        include: [{
          model: ctx.model.Menu,
          where: {
            type: [ 3 ],
          },
          raw: true,
        }],
        raw: true,
      }],
      attributes: { exclude: [ 'pswd' ] },
    });
    return result;
  }
}

module.exports = AccountService;
