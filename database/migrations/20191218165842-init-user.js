'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('user', {
      user_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '用户ID',
      },
      name: {
        type: STRING(10),
        allowNull: false,
        comment: '用户名',
      },
      pswd: {
        type: CHAR(32),
        allowNull: false,
        comment: '密码',
      },
      phone: {
        type: CHAR(11),
        allowNull: false,
        comment: '手机号码',
      },
      email: {
        type: STRING(320),
        allowNull: false,
        comment: '邮箱号码',
      },
      qq: {
        type: STRING(11),
        allowNull: true,
        comment: 'QQ账号',
      },
      github: {
        type: STRING(32),
        allowNull: true,
        comment: 'GitHub地址',
      },
      security_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '密保问题id',
      },
      security_answer: {
        type: STRING(32),
        allowNull: false,
        comment: '密保答案',
      },
      blog_title: {
        type: STRING(16),
        allowNull: true,
        comment: '博客称呼',
      },
      blog_introduction: {
        type: STRING(32),
        allowNull: true,
        comment: '博客简介',
      },
      image_url: {
        type: STRING(320),
        allowNull: true,
        comment: '用户头像地址',
      },
      image_type: {
        type: TINYINT(3),
        allowNull: false,
        comment: '用户头像选择',
      },
      register_ip: {
        type: CHAR(16),
        allowNull: false,
        comment: '用户注册IP',
      },
      register_time: {
        type: DATE,
        allowNull: false,
        comment: '用户注册时间',
      },
      last_login_ip: {
        type: CHAR(16),
        allowNull: true,
        comment: '用户最后登录IP',
      },
      last_login_time: {
        type: DATE,
        allowNull: true,
        comment: '用户最后登录时间',
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '用户状态: 1表示在线，0离线',
      },
      login_count: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '用户状态: 1表示在线，0离线',
      },
      session_id: {
        type: CHAR(32),
        allowNull: true,
        comment: '用户session_id',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
