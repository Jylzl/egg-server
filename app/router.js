/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-10 17:59:06
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
    jwt,
  } = app;
  const { account, users, uploads, menus } = controller;
  // 挂载鉴权路由
  // 登录校验
  // 本地登录
  router.post('/passport/local', app.passport.authenticate('local', { successRedirect: '/passport/local/callback', failureRedirect: '/passport/local/callback' }));
  // github登录
  app.passport.mount('github');
  // 鉴权成功后的回调页面
  router.get('/passport/local/callback', account.authCallback);

  router.get('/account/logout', account.logout);
  router.post('/account/login', account.login);
  router.get('/account/getperms', jwt, account.getPerms);
  // 用户模块
  router.resources('users', '/api/users', jwt, users);
  // 菜单模块
  router.get('/api/menus/tree', jwt, menus.tree);
  router.resources('menus', '/api/menus', jwt, menus);
  // 附件模块
  router.resources('uploads', '/api/uploads', jwt, uploads);
};
