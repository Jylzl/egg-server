/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-06 15:41:56
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
    jwt,
  } = app;
  // 挂载鉴权路由
  // 登录校验
  // 本地登录
  router.post('/passport/local', app.passport.authenticate('local', { successRedirect: '/passport/local/callback' }));
  // github登录
  app.passport.mount('github');
  // 鉴权成功后的回调页面
  router.get('/passport/local/callback', controller.account.authCallback);

  router.get('/account/logout', controller.account.logout);
  router.post('/account/login', controller.account.login);
  router.get('/account/getperms', jwt, controller.account.getPerms);
  // 用户模块
  router.resources('users', '/api/users', jwt, controller.users);
  // 附件模块
  router.resources('uploads', '/api/uploads', jwt, controller.uploads);
};
