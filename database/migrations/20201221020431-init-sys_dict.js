/**
 * @description: 字典表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 13:05:48
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('sys_dict', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('sys_dict', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '字典ID',
      },
      name: {
        field: 'name',
        type: STRING(100),
        allowNull: false,
        comment: '名称',
      },
      valueType: {
        field: 'value_type',
        type: STRING(64),
        allowNull: false,
        comment: '数据类型',
      },
      type: {
        field: 'type',
        type: TINYINT(1),
        allowNull: false,
        comment: '类型: （1系统类 2业务类）',
      },
      description: {
        field: 'description',
        type: STRING(100),
        allowNull: false,
        comment: '描述',
      },
      remarks: {
        field: 'remarks',
        type: STRING(100),
        allowNull: false,
        comment: '备注信息',
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
