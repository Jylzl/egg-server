/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-30 11:53:20
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
    const user = {
      provider: 'local',
      username,
      password,
    };
    console.log('1=========================');
    app.passport.doVerify(req, user, done);
  }));

  app.passport.verify(async (ctx, user) => {
    // 检查用户
    console.log('2=========================');

    assert(user.provider, 'user.provider should exists');

    let existsUser;
    // 从数据库中查找用户信息
    if (user.provider === 'local') {
      console.log('local-------------');
      assert(user.username, 'user.username should exists');
      assert(user.password, 'user.password should exists');
      existsUser = await ctx.service.account.login({
        user: user.username,
        pswd: user.password,
      });
    } else {
      console.log('other-------------');
      assert(user.id, 'user.id should exists');
      existsUser = await ctx.model.UserAuths.findOne({
        third_type: user.provider,
        third_key: user.id,
      });
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
    console.log('3=========================');

    console.log(user);
    const token = app.jwt.sign({ id: user.user_id, name: user.name }, app.config.jwt.secret);
    ctx.session.sessionid = token;
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    return user;
  });
};
