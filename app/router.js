/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-28 16:40:57
 */
'use strict';

module.exports = app => {
  const {
    router,
    controller,
    jwt,
  } = app;
  const { powAccount, powUser, powRole, powDept, powArea, sysFile, sysUpload, powMenu, crawler, sysDict, sysDictitem, sysSecretkey, sysLog, sysInf, appEmail } = controller;
  // 挂载鉴权路由
  // 登录校验
  // 本地登录
  router.post('/passport/local', app.passport.authenticate('local', { successRedirect: '/passport/local/callback', failureRedirect: '/passport/local/callback' }));
  // github登录
  app.passport.mount('github');
  // 鉴权成功后的回调页面
  router.get('/passport/local/callback', powAccount.authCallback);

  router.get('/account/logout', powAccount.logout);
  router.post('/account/login', powAccount.login);
  router.get('/account/getperms', jwt, powAccount.getPerms);
  // 用户模块
  router.resources('user', '/api/user', jwt, powUser);
  // 角色模块
  router.resources('role', '/api/role', jwt, powRole);
  // 地区模块
  router.get('/api/area/tree', jwt, powArea.tree);
  router.resources('area', '/api/area', jwt, powArea);
  // 部门模块
  router.get('/api/dept/tree', jwt, powDept.tree);
  router.resources('dept', '/api/dept', jwt, powDept);
  // 菜单模块
  router.get('/api/menu/tree', jwt, powMenu.tree);
  router.resources('menu', '/api/menu', jwt, powMenu);
  // 附件模块
  router.get('/api/file/down/:id', jwt, sysFile.down);
  router.resources('file', '/api/file', jwt, sysFile);
  // 上传模块
  router.post('/api/upload', jwt, sysUpload.create);
  // 采集任务模块
  router.get('/api/crawler/column', crawler.getColumn);
  router.post('/api/crawler/column', crawler.column);
  router.get('/api/crawler/article', crawler.article);
  router.post('/api/crawler/article', crawler.article);
  // 字典模块
  router.get('/api/dict/type/:type', jwt, sysDict.type);
  router.get('/api/dict/check', jwt, sysDict.check);
  router.resources('dict', '/api/dict', jwt, sysDict);
  router.get('/api/dictitem/check', jwt, sysDictitem.check);
  router.resources('dictitem', '/api/dictitem', jwt, sysDictitem);
  // 密钥管理
  router.resources('secretkey', '/api/secretkey', jwt, sysSecretkey);
  // 日志管理
  router.resources('log', '/api/log', jwt, sysLog);
  // 服务器信息模块
  router.get('/api/sysinf', jwt, sysInf.getSysInf);
  // 邮件模块
  router.post('/api/email', jwt, appEmail.create);
};
