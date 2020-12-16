/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:00:06
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('area', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '地区ID',
      },
      parent_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '父部门ID：顶级为-1',
      },
      name: {
        type: STRING(64),
        allowNull: false,
        comment: '地区名称',
      },
      abbreviation: {
        type: STRING(32),
        allowNull: false,
        comment: '地区简称',
      },
      code: {
        type: STRING(10),
        allowNull: false,
        comment: '地区编号',
      },
      desc: {
        type: STRING(200),
        allowNull: false,
        comment: '地区描述',
      },
      order_num: {
        type: TINYINT(8),
        allowNull: false,
        comment: '排序号',
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
     * await queryInterface.dropTable('users');
     */
  },
};
