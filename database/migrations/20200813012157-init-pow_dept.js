/**
 * @description: 部门表
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:57:52
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('pow_dept', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('pow_dept', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '部门ID',
      },
      parent_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '父部门ID：顶级为-1',
      },
      name: {
        type: STRING(64),
        allowNull: false,
        comment: '部门名称',
      },
      abbreviation: {
        type: STRING(32),
        allowNull: false,
        comment: '部门简称',
      },
      code: {
        type: STRING(10),
        allowNull: false,
        comment: '部门编号',
      },
      desc: {
        type: STRING(200),
        allowNull: false,
        comment: '部门描述',
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
     * await queryInterface.dropTable('pow_dept');
     */
  },
};
