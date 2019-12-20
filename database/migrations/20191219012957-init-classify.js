/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:29:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:23:01
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 classify 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('classify', {
      classify_id: {
        type: INTEGER(4),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '分类编号',
      },
      title: {
        type: STRING(16),
        allowNull: false,
        comment: '分类名称',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 classify 表
  down: async queryInterface => {
    await queryInterface.dropTable('classify');
  },
};
