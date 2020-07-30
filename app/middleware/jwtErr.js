/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-30 17:01:11
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 18:30:14
 */
'use strict';

module.exports = (options, app) => {
  return async function jwtErr(ctx, next) {
    // 拿到不需要验证的token的路由
    const routerAuth = app.config.routerAuth;
    // 获取当前路由
    const url = ctx.url;
    // 判断当前路由是否需要验证token
    const flag = routerAuth.includes(url);
    const token = ctx.request.header.authorization;
    console.log('mm');
    console.log(token);
    console.log(flag);
    console.log(ctx);
    console.log(url);
    let decode = '';
    if (flag) {
      await next();
    } else {
      if (token) {
        try {
          // 解码token
          decode = ctx.app.jwt.verify(token, options.secret);
          await next();
          console.log('decode======>', decode);
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
