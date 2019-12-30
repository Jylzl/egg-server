/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-30 11:57:36
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.resources('home', '/', controller.home.render);
  router.resources('users', '/api/users', app.jwt, controller.users);
  router.resources('uploads', '/api/uploads', controller.uploads);
  // 登录校验====================================================================================
  // 鉴权成功后的回调页面
  router.get('/api/accoun/authCallback', controller.account.authCallback);
  // github登陆
  app.passport.mount('github', {
    loginURL: '/api/account/github',
    successRedirect: '/api/accoun/authCallback',
  });
  // 本地登陆
  router.post('account', '/api/account/login', app.passport.authenticate('local', {
    successRedirect: '/api/accoun/authCallback',
  }));
};
