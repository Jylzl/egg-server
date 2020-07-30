/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 16:48:09
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // 挂载鉴权路由
  app.passport.mount('github');
  // 鉴权成功后的回调页面
  router.get('/api/accoun/authCallback', controller.account.authCallback);

  router.get('/api/logout', controller.account.logout);
  // 用户模块
  router.resources('users', '/api/users', app.jwt, controller.users);
  // 附件模块
  router.resources('uploads', '/api/uploads', app.jwt, controller.uploads);
};
