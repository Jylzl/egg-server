/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:29:57
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 09:48:14
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 classifys 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('classifys', {
      // 分类编号
      classify_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 分类名称
      classify_name: {
        type: STRING(16),
        allowNull: false,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 classifys 表
  down: async queryInterface => {
    await queryInterface.dropTable('classifys');
  },
};
