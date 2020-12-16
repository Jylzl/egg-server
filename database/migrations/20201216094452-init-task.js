/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-11 22:41:39
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:03:54
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('task', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '任务id',
      },
      title: {
        type: STRING(128),
        allowNull: false,
        comment: '文章标题',
      },
      href: {
        type: STRING(128),
        allowNull: false,
        comment: '文章链接',
      },
      date: {
        type: DATE,
        allowNull: true,
        comment: '文章时间',
      },
      status: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '状态: 0入库',
      },
      created_at: DATE,
      deleted_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('task');
  },
};
