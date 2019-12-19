/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:26
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 09:48:43
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 replys 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('replys', {
      // 回复编号
      reply_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      // 该回复用户ID
      user_id: {
        type: INTEGER(8),
        allowNull: false,
      },
      // 该回复对应评论编号
      comment_no: {
        type: INTEGER(8),
        allowNull: false,
      },
      // 回复内容
      reply_content: {
        type: STRING(512),
        allowNull: false,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 replys 表
  down: async queryInterface => {
    await queryInterface.dropTable('replys');
  },
};
