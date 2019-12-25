/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-23 10:01:40
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.passport.mount('github');
  router.resources('home', '/', controller.home.render);
  // router.resources('account', '/api/account', controller.users);
  // 登录校验
  router.post('account', '/api/account/login', app.passport.authenticate('local', { successRedirect: '/authCallback' }));

  // router.post('account', '/api/account/login', controller.account.login);
  router.resources('users', '/api/users', controller.users);
  router.resources('uploads', '/api/uploads', controller.uploads);
};
