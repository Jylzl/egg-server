/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:25:04
 */
'use strict';
const assert = require('assert');
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // eslint-disable-next-line no-unused-vars
  app.once('server', server => {
    // websocket
  });
  // eslint-disable-next-line no-unused-vars
  app.on('error', (err, ctx) => {
    // report error
  });
  // eslint-disable-next-line no-unused-vars
  app.on('request', ctx => {
    // log receive request
  });
  // eslint-disable-next-line no-unused-vars
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    // const used = Date.now() - ctx.starttime;
    // log total cost
  });

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
    // debug('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 检查用户
  app.passport.verify(async (ctx, user) => {
    console.log('检查用户');
    let existsUser = {};
    if (user.provider === 'local') {
      // 本地登录
      assert(user.username, 'user.username should exists');
      assert(user.password, 'user.password should exists');
      existsUser = await ctx.service.account.login(user);
    } else {
      // 第三方登录
      assert(user.provider, 'user.provider should exists');
      assert(user.id, 'user.id should exists');
      existsUser = await ctx.service.account.tLogin(user);
    }
    return existsUser ? existsUser : false;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    console.log('将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段');
    // console.log(user);
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    console.log('反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息');
    // console.log(user);
    return user;
  });
};
