/**
 * @description: 日志表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-24 15:26:37
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('sys_log', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('sys_log', {
      id: {
        type: INTEGER(16),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '日志ID',
      },
      type: {
        type: TINYINT(1),
        allowNull: false,
        comment: '类型: （1登录日志 2操作日志）',
      },
      title: {
        type: STRING(100),
        comment: '标题',
      },
      ip: {
        type: STRING(16),
        comment: 'IP',
      },
      user_name: {
        type: STRING(16),
        comment: '创建人',
      },
      user_id: {
        type: STRING(100),
        comment: '用户ID',
      },
      request_type: {
        type: STRING(100),
        comment: '请求类型',
      },
      time: {
        type: STRING(100),
        comment: '耗时毫秒',
      },
      created_at: DATE,
      deleted_at: DATE,
      updated_at: DATE,
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('sys_log');
     */
    await queryInterface.dropTable('sys_log');
  },
};
