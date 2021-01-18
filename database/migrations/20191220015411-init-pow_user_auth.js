/**
 * @description: 第三方登录关联表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:26
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:07:33
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 pow_user_auth 表
  up: async (queryInterface, Sequelize) => {
    const { CHAR, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('pow_user_auth', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '第三方自增ID',
      },
      userId: {
        field: 'user_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '关联user用户id',
      },
      uid: {
        field: 'uid',
        type: CHAR(32),
        allowNull: false,
        comment: '三方登陆唯一标识',
      },
      provider: {
        field: 'provider',
        type: CHAR(10),
        allowNull: false,
        comment: '三方登陆类型',
      },
      createdAt: {
        field: 'created_at',
        type: DATE,
        comment: '创建时间',
      },
      deletedAt: {
        field: 'deleted_at',
        type: DATE,
        comment: '删除时间',
      },
      updatedAt: {
        field: 'updated_at',
        type: DATE,
        comment: '修改时间',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 pow_user_auth 表
  down: async queryInterface => {
    await queryInterface.dropTable('pow_user_auth');
  },
};
