/**
 * @description: 采集内容表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-12 10:53:01
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-30 09:43:16
 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, TINYINT, TEXT, DATE } = app.Sequelize;

  const CrawlerContent = app.model.define('crawler_content', {
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
      type: STRING(512),
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
      type: STRING(512),
      comment: '关键词',
    },
    author: {
      field: 'author',
      type: STRING(256),
      comment: '作者',
    },
    description: {
      field: 'description',
      type: STRING(1024),
      comment: '摘要',
    },
    image: {
      field: 'image',
      type: STRING(256),
      comment: '图片',
    },
    images: {
      field: 'images',
      type: STRING(3000),
      comment: '图片集合',
      get() {
        return this.getDataValue('images').split(',');
      },
      set(val) {
        this.setDataValue('images', val.join(','));
      },
    },
    resources: {
      field: 'resources',
      type: STRING(3000),
      comment: '资源集合',
      get() {
        return this.getDataValue('resources').split(',');
      },
      set(val) {
        this.setDataValue('resources', val.join(','));
      },
    },
    content: {
      field: 'content',
      type: TEXT('long'),
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
    isExternallinks: {
      field: 'is_external_links',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '是否外链文章: 0否，1为是',
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
  }, {
    tableName: 'crawler_content',
    comment: '采集内容表',
    timestamps: true,
  });

  CrawlerContent.associate = () => {
    // 与CrawlerColumn存在一对多关系，所以是hasMany()
    app.model.CrawlerContent.belongsTo(app.model.CrawlerColumn, { foreignKey: 'column_id', targetKey: 'id', as: 'contentColumn' });
    // 与CrawlerColumn存在一对多关系，所以是hasMany()
    app.model.CrawlerContent.belongsTo(app.model.CrawlerSite, { foreignKey: 'site_id', targetKey: 'id', as: 'contentSite' });
  };
  return CrawlerContent;
};
