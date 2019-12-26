/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-26 13:09:23
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.passport.mount('github');
  router.resources('home', '/', controller.home.render);
  // router.resources('account', '/api/account', controller.users);
  // 登录校验
  router.post('account', '/api/account/login', app.passport.authenticate('local'));

  // router.post('account', '/api/account/login', controller.account.login);
  router.resources('users', '/api/users', controller.users);
  router.resources('uploads', '/api/uploads', controller.uploads);
};
