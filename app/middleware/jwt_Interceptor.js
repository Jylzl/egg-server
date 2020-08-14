/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-30 17:01:11
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-14 11:32:47
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
    // 从请求头里面或者url参数里面获取token
    const token = ctx.headers.authorization ? ctx.headers.authorization.substring(7) : '' || ctx.query.access_token || '';
    console.log('路由拦截器' + url);
    if (flag) {
      await next();
    } else {
      if (token) {
        try {
          if (!ctx.isAuthenticated()) {
            ctx.helper.noPermission({
              ctx,
              msg: '身份过期,重新登录',
            });
          } else {
            await next();
          }
        } catch (error) {
          ctx.helper.noPermission({
            ctx,
            msg: error.message,
          });
          return;
        }
      } else {
        ctx.helper.noPermission({
          ctx,
          msg: 'Token信息不存在',
        });
        return;
      }
    }
  };
};
