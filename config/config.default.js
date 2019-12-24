/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-23 14:25:10
 */
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

  // jwt
  config.jwt = {
    secret: '123456',
  };
  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
      headerName: 'x-csrf-token', // 自定义请求头
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
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

  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: '39.108.161.110', // host
    port: '3306', // 端口号
    user: 'root', // 用户名
    password: '929924', // 密码
    database: 'blogdb', // 数据库名
    // model的全局配置
    define: {
      timestamps: false, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false, // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  config.passportGithub = {
    key: 'acfcd0190ec95436f272',
    secret: '4a2a59ff108b6b915010ac085cfb8cd38bf00bde',
    callbackURL: 'http://127.0.0.1:7001/passport/github/callback',
    // proxy: false,
  };

  // config.multipart = {
  //   mode: 'file',
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
