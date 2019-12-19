/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:34
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 09:49:02
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 securitys 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('securitys', {
      // 密保编号
      security_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 密保内容
      security_content: {
        type: STRING(32),
        allowNull: false,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 securitys 表
  down: async queryInterface => {
    await queryInterface.dropTable('securitys');
  },
};
