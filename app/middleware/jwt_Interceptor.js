/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-30 17:01:11
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 09:13:27
 */
'use strict';

module.exports = (options, app) => {
  return async function jwtErr(ctx, next) {
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由,过滤?后面的参数
    const url = ctx.url.replace(/\?.*/, '');
    // 判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);
    const token = ctx.request.header.authorization;
    if (flag) {
      await next();
    } else {
      if (token) {
        try {
          // 解码token
          const decode = ctx.app.jwt.verify(token, options.secret);
          ctx.state.userinfo = decode;
          await next();
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: error.message,
          };
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: '身份过期,重新登录',
        };
        return;
      }
    }
  };
};
