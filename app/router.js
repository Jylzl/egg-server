'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('users', '/users', controller.users);
  router.resources('topics', '/api/v2/topics', app.controller.topics);
  app.passport.mount('github');

  // app.router.get('/logout', 'user.logout');
};
