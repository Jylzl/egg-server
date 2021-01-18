/**
 * @description: 字典项表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:34:53
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('sys_dict_item', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('sys_dict_item', {
      id: {
        field: 'id',
        type: INTEGER(32),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '字典项ID',
      },
      dictId: {
        field: 'dict_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '字典ID',
      },
      label: {
        field: 'label',
        type: STRING(100),
        allowNull: false,
        comment: '标签名',
      },
      value: {
        field: 'value',
        type: STRING(100),
        allowNull: false,
        comment: '数据值',
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
      orderNum: {
        field: 'order_num',
        type: TINYINT(8),
        allowNull: false,
        comment: '排序号',
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
     * await queryInterface.dropTable('sys_dict_item');
     */
    await queryInterface.dropTable('sys_dict_item');
  },
};
