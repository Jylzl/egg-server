/**
 * @description: 采集模板
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 09:25:58
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('crawler_template', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('crawler_template', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '模板id',
      },
      name: {
        field: 'name',
        type: STRING(128),
        allowNull: false,
        comment: '模板名称',
      },
      articleTitle: {
        field: 'article_title',
        type: STRING(128),
        comment: '标题',
      },
      pubDate: {
        field: 'pub_date',
        type: STRING(128),
        comment: '发布时间',
      },
      contentSource: {
        field: 'content_source',
        type: STRING(128),
        comment: '来源',
      },
      keywords: {
        field: 'keywords',
        type: STRING(128),
        comment: '关键词',
      },
      author: {
        field: 'author',
        type: STRING(128),
        comment: '作者',
      },
      description: {
        field: 'description',
        type: STRING(128),
        comment: '摘要',
      },
      image: {
        field: 'image',
        type: STRING(128),
        comment: '图片',
      },
      url: {
        field: 'url',
        type: STRING(128),
        comment: '网址',
      },
      content: {
        field: 'content',
        type: STRING(128),
        comment: '内容',
      },
      views: {
        field: 'views',
        type: STRING(128),
        comment: '阅读量',
      },
      desc: {
        field: 'desc',
        type: STRING(200),
        comment: '描述',
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
     * await queryInterface.dropTable('crawler_template');
     */
    await queryInterface.dropTable('crawler_template');
  },
};
