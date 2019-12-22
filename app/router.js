/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 14:18:47
 */
'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('home', '/', controller.home.render);
  router.resources('users', '/api/users', controller.users);
  router.resources('uploads', '/api/uploads', controller.uploads);
  app.passport.mount('github');
};
