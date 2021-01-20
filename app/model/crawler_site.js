/**
 * @description: 采集站点配置
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-18 09:21:18
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 14:33:22
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CrawlerSite = app.model.define('crawler_site', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'ID',
    },
    name: {
      field: 'name',
      type: STRING(64),
      allowNull: false,
      comment: '站点名称',
    },
    siteId: {
      field: 'site_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '站点ID',
    },
    crawlerSiteName: {
      field: 'crawler_site_name',
      type: STRING(64),
      allowNull: false,
      comment: '采集站点名称',
    },
    crawlerSiteUrl: {
      field: 'crawler_site_url',
      type: STRING(128),
      allowNull: false,
      comment: '采集站点链接',
    },
    desc: {
      field: 'desc',
      type: STRING(200),
      allowNull: false,
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
  }, {
    tableName: 'crawler_site',
    comment: '采集站点配置表',
  });

  CrawlerSite.associate = () => {
    // 与CrawlerColumn存在一对多关系，所以是hasMany()
    app.model.CrawlerSite.hasMany(app.model.CrawlerColumn, { foreignKey: 'id', targetKey: 'siteId' });
    // 与CrawlerContent存在一对多关系，所以是hasMany()
    app.model.CrawlerSite.hasMany(app.model.CrawlerContent, { foreignKey: 'id', targetKey: 'siteId' });
  };
  return CrawlerSite;
};
