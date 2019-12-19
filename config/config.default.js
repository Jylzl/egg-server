/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.security = {
    csrf: {
      // enable: false,
      headerName: 'x-csrf-token', // 自定义请求头
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576679752309_3203';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'gzip' ];

  // 配置 gzip 中间件的配置
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  config.errorHandler = {
    match: '/api',
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '39.108.161.110',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '929924',
      // 数据库名
      database: 'blogdb',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.sequelize = {
    dialect: 'mysql',
    // host
    host: '39.108.161.110',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '929924',
    // 数据库名
    database: 'blogdb',
  };

  config.passportGithub = {
    key: 'acfcd0190ec95436f272',
    secret: '4a2a59ff108b6b915010ac085cfb8cd38bf00bde',
    callbackURL: 'http://127.0.0.1:7001/passport/github/callback',
    // proxy: false,
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
