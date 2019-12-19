'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, TINYINT } = Sequelize;
    await queryInterface.createTable('users', {
      // 用户ID
      user_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '用户ID',
      },
      // 用户名
      user_name: {
        type: STRING(10),
        allowNull: false,
        comment: '用户名',
      },
      // 密码
      user_pwd: {
        type: CHAR(32),
        allowNull: false,
        comment: '密码',
      },
      // 手机号码
      user_phone: {
        type: CHAR(11),
        allowNull: false,
        comment: '手机号码',
      },
      // 邮箱号码
      user_email: {
        type: STRING(320),
        allowNull: false,
        comment: '邮箱号码',
      },
      // QQ账号
      user_qq: {
        type: STRING(11),
        allowNull: true,
        comment: 'QQ账号',
      },
      // GitHub地址
      user_github: {
        type: STRING(32),
        allowNull: true,
        comment: 'GitHub地址',
      },
      // 密保问题编号
      security_no: {
        type: INTEGER(8),
        allowNull: false,
        comment: '密保问题编号',
      },
      // 密保答案
      user_security_answer: {
        type: STRING(32),
        allowNull: false,
        comment: '密保答案',
      },
      // 博客称呼
      user_blog_title: {
        type: STRING(16),
        allowNull: true,
        comment: '博客称呼',
      },
      // 博客简介
      user_blog_introduction: {
        type: STRING(32),
        allowNull: true,
        comment: '博客简介',
      },
      // 用户访问量
      user_view: {
        type: INTEGER(8),
        allowNull: false,
        defaultValue: 0,
        comment: '用户访问量',
      },
      // 用户头像地址
      user_image_url: {
        type: STRING(320),
        allowNull: true,
        comment: '用户头像地址',
      },
      // 用户头像选择
      user_image_type: {
        type: TINYINT(3),
        allowNull: false,
        comment: '用户头像选择',
      },
      // 用户注册IP
      user_register_ip: {
        type: CHAR(16),
        allowNull: false,
        comment: '用户注册IP',
      },
      // 用户最后登录IP
      user_last_login_ip: {
        type: CHAR(16),
        allowNull: true,
        comment: '用户最后登录IP',
      },
      // 用户状态: 1表示在线，0离线
      user_type: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '用户状态: 1表示在线，0离线',
      },
      // 账户状态，0表示正常，1表示锁定
      user_lock: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '账户状态，0表示正常，1表示锁定',
      },
      // 用户session_id
      session_id: {
        type: CHAR(32),
        allowNull: true,
        comment: '用户session_id',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
