/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:26
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:23:14
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 reply 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('reply', {
      reply_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '回复id',
      },
      user_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '该回复用户ID',
      },
      comment_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '该回复对应评论id',
      },
      content: {
        type: STRING(512),
        allowNull: false,
        comment: '回复内容',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 reply 表
  down: async queryInterface => {
    await queryInterface.dropTable('reply');
  },
};
