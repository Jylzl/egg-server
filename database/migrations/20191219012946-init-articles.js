/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:29:46
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 09:35:01
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 articles 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, TEXT, INTEGER, BOOLEAN } = Sequelize;
    await queryInterface.createTable('articles', {
      // 文章编号
      article_id: {
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '文章编号',
      },
      // 文章标题
      article_title: {
        type: STRING(255),
        allowNull: false,
      },
      // 文章内容
      article_content: {
        type: TEXT,
        allowNull: false,
      },
      // 文章内容，带HTML标签
      article_html: {
        type: TEXT,
        allowNull: false,
      },
      // 文章摘要
      article_summary: {
        type: STRING(256),
        allowNull: false,
      },
      // 文章自定义标签
      article_label: {
        type: STRING(64),
        allowNull: true,
      },
      // 文章阅读量
      article_read: {
        type: INTEGER(8),
        allowNull: false,
        defaultValue: 0,
      },
      // 文章评论数量
      article_type: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
      // 文章显示，0公开，1私有
      article_view: {
        type: BOOLEAN(1),
        allowNull: false,
        defaultValue: 0,
      },
      // 文章置顶，0普通，1置顶
      article_top: {
        type: BOOLEAN(1),
        allowNull: false,
        defaultValue: 0,
      },
      // 文章是否可以评论，0不能，1可以
      article_is_comment: {
        type: BOOLEAN(1),
        allowNull: false,
        defaultValue: 1,
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 articles 表
  down: async queryInterface => {
    await queryInterface.dropTable('articles');
  },
};
