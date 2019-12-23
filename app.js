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
module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.provider, 'user.provider should exists');
    assert(user.id, 'user.id should exists');

    // 从数据库中查找用户信息
    const auth = await ctx.model.UserAuths.findOne({
      where: {
        third_key: user.id,
        third_type: user.provider,
      },
    });
    const existsUser = await ctx.model.User.findByPk(auth.id);
    if (existsUser) {
      return existsUser;
    }
    // 调用 service 注册新用户
    const newUser = await app.mysql.insert('user', user);
    // const newUser = await ctx.service.user.register(user);
    return newUser;
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
