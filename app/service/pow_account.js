/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 15:07:27
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-05 18:20:42
 */
'use strict';

// app/service/account.js
const Service = require('egg').Service;

class PowAccountService extends Service {
  // 根据第三方授权信息查询用户
  async tLogin(params) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.PowUserAuth.findOne({
      where: {
        uid: params.id,
        provider: params.provider,
      },
      // include: [{ model: ctx.model.PowUser, attributes: { exclude: [ 'pswd' ] } }],
    });
    const result1 = await ctx.model.PowUser.findOne({
      where: {
        id: result.user_id,
      },
      include: {
        model: ctx.model.PowUserInf,
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
    const result = await ctx.model.PowUser.findOne({
      where: {
        name: params.username,
        pswd: params.password,
      },
      include: [{
        model: ctx.model.PowUserInf,
      }, {
        model: ctx.model.PowRole,
      }],
      attributes: { exclude: [ 'pswd' ] },
    });
    if (result) {
      ctx.model.PowUser.findById(result.id).then(user => {
        user.increment('login_count').then(user => {
          console.log(user);
        });
      });
    }
    return result;
  }

  async authCallback() {
    const {
      ctx,
    } = this;
    return ctx.session.token;
  }

  // 根据用户id获取对应角色的菜单及按钮
  async menusByUser(id, type) {
    const {
      ctx,
    } = this;
    const result = await ctx.model.PowUser.findByPk(id, {
      include: [{
        model: ctx.model.PowRole,
        attributes: [ 'id' ],
        include: [{
          model: ctx.model.PowMenu,
          where: {
            type,
          },
          attributes: [ 'id', 'name', 'title', 'icon' ].concat(type.length === 1 ? [ 'perms' ] : [ 'parent_id', 'rurl', 'leaf', 'url', 'display' ]),
          raw: true,
        }],
        raw: true,
      }],
      attributes: [ 'id' ],
    });
    let arr = [];
    result.pow_roles.forEach(role => {
      role.pow_menus.forEach(menu => {
        const has = arr.findIndex(item => {
          return item.id === menu.id;
        });
        if (has === -1) {
          arr.push(menu);
        }
      });
    });
    // return arr;
    // 组装前端的路由结构
    if (type.length !== 1) {
      arr = arr.map(item => {
        return {
          id: item.id,
          parent_id: item.parent_id,
          meta: {
            title: item.title,
            hidden: item.vidible,
            leaf: item.leaf,
            iconCls: item.icon,
            topPath: item.url.indexOf('/') === 0 ? '/' + item.url.split('/')[1] : '/',
          },
          path: item.url,
          name: item.name,
          component: item.name,
        };
      });
      arr = ctx.helper.translateDataToTree(arr, 'id', 'parent_id', 'children');
    }
    return arr;
    // return type.length === 1 ? arr : ctx.helper.translateDataToTree(arr, 'id', 'parent_id', 'children');
  }
}

module.exports = PowAccountService;
