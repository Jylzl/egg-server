/**
 * @description: 角色跟菜单的中间表
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:56:16
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
      role_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '角色ID',
      },
      menu_id: {
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
