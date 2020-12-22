/**
 * @description: 菜单表
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:55:01
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('pow_menu', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('pow_menu', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '菜单ID',
      },
      parent_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '父菜单ID：顶级为-1',
      },
      name: {
        type: STRING(32),
        allowNull: false,
        comment: '菜单名',
      },
      title: {
        type: STRING(10),
        allowNull: false,
        comment: '菜单标题',
      },
      url: {
        type: STRING(200),
        allowNull: false,
        comment: '菜单路径',
      },
      rurl: {
        type: STRING(200),
        allowNull: false,
        comment: '重定向路径',
      },
      type: {
        type: TINYINT(1),
        allowNull: false,
        comment: '类型: （1目录 2菜单 3按钮）',
      },
      perms: {
        type: STRING(100),
        comment: '权限标识',
      },
      icon: {
        type: STRING(100),
        comment: '图标',
      },
      vidible: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '菜单状态（1显示 0隐藏）',
      },
      display: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '禁用（1是 0否）',
      },
      leaf: {
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '是否叶子节点（1是 0否）',
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
     * await queryInterface.dropTable('pow_menu');
     */
    await queryInterface.dropTable('pow_menu');
  },
};