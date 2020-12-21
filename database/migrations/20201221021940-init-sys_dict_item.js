/**
 * @description: 字典项表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 10:26:45
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
    await queryInterface.createTable('sys_dict_item', {
      id: {
        type: INTEGER(32),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '字典项ID',
      },
      dict_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '字典ID',
      },
      label: {
        type: STRING(100),
        allowNull: false,
        comment: '标签名',
      },
      value: {
        type: STRING(100),
        allowNull: false,
        comment: '数据值',
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
     * await queryInterface.dropTable('sys_dict_item');
     */
    await queryInterface.dropTable('sys_dict_item');
  },
};
