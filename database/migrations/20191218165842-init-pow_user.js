/**
 * @description: 用户表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 17:59:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:53:12
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 pow_user 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('pow_user', {
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
      pswd: {
        type: CHAR(32),
        allowNull: false,
        comment: '密码',
      },
      dept_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '部门ID',
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
  // 在执行数据库降级时调用的函数，删除 pow_user 表
  down: async queryInterface => {
    await queryInterface.dropTable('pow_user');
  },
};
