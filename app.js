/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 18:11:51
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
    console.log('11111111111111111112');
    console.log(user);
    // debug('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 检查用户
  app.passport.verify(async (ctx, user) => {
    let existsUser = {};
    console.log('检查用户');
    if (user.provider === 'local') {
      assert(user.username, 'user.username should exists');
      assert(user.password, 'user.password should exists');
      existsUser = await ctx.service.account.login(user);
    } else {
      assert(user.provider, 'user.provider should exists');
      assert(user.id, 'user.id should exists');
      existsUser = await ctx.service.account.tLogin({
        uid: user.id,
        provider: user.provider,
      });
    }
    return existsUser;
  });

  // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
  app.passport.serializeUser(async (ctx, user) => {
    // 处理 user
    const token = app.jwt.sign({ id: user.id }, app.config.jwt.secret);
    console.log('将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段');
    // console.log(user);
    console.log(token);
    ctx.session.user = token;
    // ctx.set({ authorization: token });
    // console.log(user);
    return user;
  });

  // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
  app.passport.deserializeUser(async (ctx, user) => {
    // 处理 user
    // const token = ctx.session.token;
    const decode = ctx.app.jwt.verify(user, app.config.jwt.secret);

    console.log('反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息');
    console.log(user);
    console.log(decode);
    // console.log(token);
    // console.log(decode);
    // const existsUser = await ctx.service.user.find(decode.id);
    return user;
  });
};
