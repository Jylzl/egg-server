/**
 * @description: 采集模板
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 10:25:49
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('crawler_content', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('crawler_content', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '内容id',
      },
      siteId: {
        field: 'site_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '站点ID',
      },
      columnId: {
        field: 'column_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '栏目ID',
      },
      url: {
        field: 'url',
        type: STRING(128),
        comment: '原网址',
      },
      articleTitle: {
        field: 'article_title',
        type: STRING(256),
        comment: '标题',
      },
      pubDate: {
        field: 'pub_date',
        type: DATE,
        comment: '发布时间',
      },
      contentSource: {
        field: 'content_source',
        type: STRING(256),
        comment: '来源',
      },
      keywords: {
        field: 'keywords',
        type: STRING(256),
        comment: '关键词',
      },
      author: {
        field: 'author',
        type: STRING(256),
        comment: '作者',
      },
      description: {
        field: 'description',
        type: STRING(256),
        comment: '摘要',
      },
      image: {
        field: 'image',
        type: STRING(256),
        comment: '图片',
      },
      content: {
        field: 'content',
        type: TEXT(),
        comment: '内容',
      },
      views: {
        field: 'views',
        type: STRING(128),
        comment: '阅读量',
      },
      status: {
        field: 'status',
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '状态: 0待同步',
      },
      createdAt: {
        field: 'created_at',
        type: DATE,
        comment: '创建时间',
      },
      deletedAt: {
        field: 'deleted_at',
        type: DATE,
        comment: '删除时间',
      },
      updatedAt: {
        field: 'updated_at',
        type: DATE,
        comment: '修改时间',
      },
    });
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('crawler_content');
     */
    await queryInterface.dropTable('crawler_content');
  },
};
