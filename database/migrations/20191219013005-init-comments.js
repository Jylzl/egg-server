/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 09:36:24
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 comments 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('comments', {
      // 评论编号
      comment_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 当前评论用户
      user_id: {
        type: INTEGER(8),
        allowNull: false,
      },
      // 评论内容
      comment_content: {
        type: STRING(512),
        allowNull: false,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 comments 表
  down: async queryInterface => {
    await queryInterface.dropTable('comments');
  },
};
