/**
 * @description: 用户表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 17:59:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:33:11
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('user', {
      id: {
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
      real_name: {
        type: STRING(10),
        allowNull: false,
        comment: '真实姓名',
      },
      pswd: {
        type: CHAR(32),
        allowNull: false,
        comment: '密码',
      },
      id_card: {
        type: CHAR(18),
        allowNull: false,
        comment: '身份证号码',
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
      image_url: {
        type: STRING(320),
        allowNull: true,
        comment: '用户头像地址',
      },
      register_ip: {
        type: CHAR(16),
        allowNull: true,
        comment: '用户注册IP',
      },
      register_time: {
        type: DATE,
        allowNull: true,
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
        comment: '用户登录次数',
      },
      session_id: {
        type: CHAR(32),
        allowNull: true,
        comment: '用户session_id',
      },
      created_at: DATE,
      deleted_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
