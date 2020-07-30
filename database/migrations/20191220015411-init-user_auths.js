/**
 * @description: 第三方登录关联表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:26
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 09:20:59
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user_auths 表
  up: async (queryInterface, Sequelize) => {
    const { CHAR, INTEGER } = Sequelize;
    await queryInterface.createTable('user_auths', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '第三方自增ID',
      },
      user_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '关联user用户id',
      },
      uid: {
        type: CHAR(32),
        allowNull: false,
        comment: '三方登陆唯一标识',
      },
      provider: {
        type: CHAR(10),
        allowNull: false,
        comment: '三方登陆类型',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 user_auths 表
  down: async queryInterface => {
    await queryInterface.dropTable('user_auths');
  },
};
