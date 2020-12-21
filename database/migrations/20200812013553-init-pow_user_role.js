/**
 * @description: 用户跟角色的中间表
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:56:59
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('pow_user_role', { id: Sequelize.INTEGER });
     */
    const { INTEGER } = Sequelize;
    await queryInterface.createTable('pow_user_role', {
      user_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '用户ID',
      },
      role_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '角色ID',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('pow_user_role');
     */
  },
};
