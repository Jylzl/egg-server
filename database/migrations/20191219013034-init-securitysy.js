/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:34
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:23:21
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 security 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('security', {
      security_id: {
        type: INTEGER(4),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '密保id',
      },
      question: {
        type: STRING(32),
        allowNull: false,
        comment: '密保问题',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 security 表
  down: async queryInterface => {
    await queryInterface.dropTable('security');
  },
};
