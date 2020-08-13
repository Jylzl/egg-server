/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 09:20:18
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
    jwt,
  } = app;
  const { account, user, role, dept, upload, menu } = controller;
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
  router.resources('user', '/api/user', jwt, user);
  // 角色模块
  router.resources('role', '/api/role', jwt, role);
  // 部门模块
  router.get('/api/dept/tree', jwt, dept.tree);
  router.resources('dept', '/api/dept', jwt, dept);
  // 菜单模块
  router.get('/api/menu/tree', jwt, menu.tree);
  router.resources('menu', '/api/menu', jwt, menu);
  // 附件模块
  router.resources('upload', '/api/upload', jwt, upload);
};
