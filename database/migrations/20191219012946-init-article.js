/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:29:46
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:09:30
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 article 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, INTEGER, BOOLEAN } = Sequelize;
    await queryInterface.createTable('article', {
      article_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '文章id',
      },
      title: {
        type: STRING(256),
        allowNull: false,
        comment: '文章标题',
      },
      content: {
        type: TEXT,
        allowNull: false,
        comment: '文章内容',
      },
      // 文章摘要
      description: {
        type: STRING(256),
        allowNull: false,
        comment: '文章id',
      },
      tags: {
        type: STRING(256),
        allowNull: true,
        comment: '文章自定义标签',
      },
      view: {
        type: INTEGER(8),
        allowNull: false,
        defaultValue: 0,
        comment: '文章阅读量',
      },
      status: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0,
        comment: '文章状态',
      },
      top_level: {
        type: INTEGER(2),
        allowNull: false,
        defaultValue: 0,
        comment: '文章固顶级别',
      },
      is_comment: {
        type: BOOLEAN(1),
        allowNull: false,
        defaultValue: 1,
        comment: '文章是否可以评论，0不能，1可以',
      },
      user_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '关联用户ID',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 article 表
  down: async queryInterface => {
    await queryInterface.dropTable('article');
  },
};
