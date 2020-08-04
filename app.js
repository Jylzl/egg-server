/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-04 13:12:31
 */
'use strict';
const assert = require('assert');
const ms = require('ms');
const { decode } = require('querystring');
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
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
    let existsUser = {};
    console.log('检查用户');
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
    return existsUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    const token = app.jwt.sign({ id: user.id }, app.config.jwt.secret);
    console.log('将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段');
    return token;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    console.log('反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息');
    const decode = ctx.app.jwt.verify(user, app.config.jwt.secret);
    const existsUser = await ctx.service.user.find(decode.id);
    return existsUser;
  });
};
