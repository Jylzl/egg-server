/**
 * @description: 角色跟菜单的中间表
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:04:44
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('pow_role_menu', { id: Sequelize.INTEGER });
     */
    const { INTEGER } = Sequelize;
    await queryInterface.createTable('pow_role_menu', {
      roleId: {
        field: 'role_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '角色ID',
      },
      menuId: {
        field: 'menu_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '菜单ID',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('pow_role_menu');
     */
  },
};
