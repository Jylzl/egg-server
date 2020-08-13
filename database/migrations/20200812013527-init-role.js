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
    const { STRING, INTEGER } = Sequelize;
    await queryInterface.createTable('role', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '角色ID',
      },
      name: {
        type: STRING(10),
        allowNull: false,
        comment: '角色名称',
      },
      code: {
        type: STRING(10),
        allowNull: false,
        comment: '角色标识',
      },
      desc: {
        type: STRING(200),
        allowNull: false,
        comment: '角色描述',
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
