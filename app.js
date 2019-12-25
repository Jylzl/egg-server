/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-23 13:09:10
 */
'use strict';
const assert = require('assert');
// app.js
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.username, 'user.username should exists');
    let existsUser;
    // 从数据库中查找用户信息
    console.log('user');
    console.log(user);

    if (user.provider === 'local') {
      existsUser = await ctx.service.account.login({
        user: user.username,
        pswd: user.password,
      });
      console.log(existsUser);
      // existsUser = await ctx.model.User.findOne({
      //   name: 'lizilong',
      //   pswd: 'long1234',
      // });
    } else {
      const auth = await ctx.model.UserAuths.findOne({
        where: {
          name: user.username,
          pswd: user.password,
        },
      });
      existsUser = await ctx.model.User.findByPk(auth.id);
    }

    if (!existsUser) {
      ctx.throw(401, 'Wrong user name or password');
    } else {
      return existsUser;
    }
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    console.log('user----------------------');
    console.log(user);
    ctx.session.sessionid = user.id;
    // return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // ...
    // return user;
  });
};