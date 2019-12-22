'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('upload', {
      upload_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '附件ID',
      },
      name: {
        type: STRING(64),
        allowNull: false,
        comment: '附件',
      },
      extname: {
        type: CHAR(8),
        allowNull: false,
        comment: '文件扩展名',
      },
      size: {
        type: INTEGER(64),
        allowNull: false,
        comment: '文件大小',
      },
      url: {
        type: STRING(128),
        allowNull: false,
        comment: '资源地址',
      },
      create_time: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
      },
      update_time: {
        type: DATE,
        allowNull: false,
        comment: '修改时间',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 upload 表
  down: async queryInterface => {
    await queryInterface.dropTable('upload');
  },
};
