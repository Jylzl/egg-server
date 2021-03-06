/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-29 16:14:07
 */
/* eslint valid-jsdoc: "off" */

'use strict';
// 引入Op模块
const Op = require('sequelize').Op;
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

  // 不需要验证token的路由
  config.routerAuth = [ '/public/uploads', '/uploads', '/passport/github', '/passport/github/callback', '/passport/local', '/passport/local/callback', '/api/logout', '/account/login' ];

  // 静态资源地址
  config.assets = {
    publicPath: '/public/',
  };

  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      enable: true,
      headerName: 'x-csrf-token', // 自定义请求头
      ignore: ctx => {
        if (ctx.request.url === '/passport/local') {
          return true;
        }
      },
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://127.0.0.1:8082' ],
  };

  // 跨域配置
  config.cors = {
    credentials: true,
    origin: 'http://127.0.0.1:8082',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576679752309_3203';

  // add your middleware config here
  // config.middleware = [ 'errorHandler', 'gzip', 'jwtErr' ];
  // config.middleware = [ 'errorHandler', 'gzip', 'jwtInterceptor' ];
  config.middleware = [ 'jwtInterceptor', 'errorHandler', 'gzip' ];

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

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: '127.0.0.1', // host
    port: '3306', // 端口号
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'blogdb', // 数据库名
    // model的全局配置
    define: {
      timestamps: true, // 添加create,update,delete时间戳
      paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: true, // 防止驼峰式字段被默认转为下划线
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
    // 使用默认运算符别名
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
    },
    // 日志打印
    logging: false,
  };

  // GitHub登录
  config.passportGithub = {
    key: 'acfcd0190ec95436f272',
    secret: '4a2a59ff108b6b915010ac085cfb8cd38bf00bde',
    callbackURL: 'http://127.0.0.1:7001/passport/github/callback',
    // proxy: false,
  };

  // session自更新
  config.session = {
    renew: true,
  };

  // 文件上传,注意使用stream流方式需要把之前配置里的multipart删掉，这两种方法不能一起用，否则会报错。
  config.multipart = {
    mode: 'stream', // file stream
    fileSize: '500mb',
    whitelist: [
      // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
      // doc
      '.txt',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.pdf',
    ],
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
