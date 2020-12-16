/**
 * @description: 附件表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 17:56:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:04:18
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('upload', {
      id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '附件ID',
      },
      name: {
        type: STRING(64),
        allowNull: false,
        comment: '附件原名称',
      },
      extname: {
        type: CHAR(8),
        allowNull: false,
        comment: '文件扩展名',
      },
      mimeType: {
        type: CHAR(32),
        allowNull: false,
        comment: '文件类型',
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
      created_at: DATE,
      deleted_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 upload 表
  down: async queryInterface => {
    await queryInterface.dropTable('upload');
  },
};
