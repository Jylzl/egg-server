/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-31 17:11:27
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // 挂载鉴权路由
  // 登录校验
  // 本地登录
  router.post('/passport/local', app.passport.authenticate('local', { successRedirect: '/passport/local/callback' }));
  // github登录
  app.passport.mount('github');
  // 鉴权成功后的回调页面
  router.get('/passport/local/callback', controller.account.authCallback);

  router.get('/api/logout', controller.account.logout);
  // 用户模块
  router.resources('users', '/api/users', app.jwt, controller.users);
  // 附件模块
  router.resources('uploads', '/api/uploads', app.jwt, controller.uploads);
};
