/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: Do not edit
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
    const { INTEGER } = Sequelize;
    await queryInterface.createTable('role_menu', {
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
     * await queryInterface.dropTable('users');
     */
  },
};
