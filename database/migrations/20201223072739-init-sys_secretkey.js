/**
 * @description: 密钥表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-23 15:27:39
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 15:32:01
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('sys_secretkey', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('sys_secretkey', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '密钥ID',
      },
      type: {
        type: STRING(64),
        comment: '类型',
      },
      remarks: {
        type: STRING(100),
        comment: '备注信息',
      },
      app_id: {
        type: STRING(100),
        comment: 'app_id',
      },
      app_secret: {
        type: STRING(100),
        comment: 'app_secret',
      },
      redirect_url: {
        type: STRING(100),
        comment: 'redirect_url',
      },
      description: {
        type: STRING(100),
        comment: '描述',
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
     * await queryInterface.dropTable('sys_secretkey');
     */
    await queryInterface.dropTable('sys_dict');
  },
};
