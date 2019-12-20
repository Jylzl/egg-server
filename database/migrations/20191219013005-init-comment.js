/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:09:49
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 comment 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('comment', {
      comment_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '评论id',
      },
      user_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '评论用户id',
      },
      content: {
        type: STRING(512),
        allowNull: false,
        comment: '评论内容',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 comment 表
  down: async queryInterface => {
    await queryInterface.dropTable('comment');
  },
};
