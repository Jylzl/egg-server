/**
 * @description: 字典表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-22 10:29:49
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
    await queryInterface.createTable('sys_dict', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '字典ID',
      },
      name: {
        type: STRING(100),
        allowNull: false,
        comment: '名称',
      },
      value_type: {
        type: STRING(64),
        allowNull: false,
        comment: '数据类型',
      },
      type: {
        type: TINYINT(1),
        allowNull: false,
        comment: '类型: （1系统类 2业务类）',
      },
      description: {
        type: STRING(100),
        allowNull: false,
        comment: '描述',
      },
      remarks: {
        type: STRING(100),
        allowNull: false,
        comment: '备注信息',
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
     * await queryInterface.dropTable('sys_dict');
     */
    await queryInterface.dropTable('sys_dict');
  },
};
