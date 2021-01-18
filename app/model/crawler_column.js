/**
 * @description: 采集栏目配置
 * @author: lizlong<94648929@qq.com>
 * @since: 2021-01-18 09:21:18
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 17:01:55
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CrawlerColumn = app.model.define('crawler_column', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'ID',
    },
    siteId: {
      field: 'site_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '所属站点Id',
    },
    name: {
      field: 'name',
      type: STRING(64),
      allowNull: false,
      comment: '栏目名称',
    },
    columnId: {
      field: 'column_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '栏目ID',
    },
    crawlerColumnName: {
      field: 'crawler_column_name',
      type: STRING(64),
      allowNull: false,
      comment: '采集栏目名称',
    },
    crawlerColumnUrl: {
      field: 'crawler_column_url',
      type: STRING(128),
      allowNull: false,
      comment: '采集栏目链接',
    },
    crawlerPageSize: {
      field: 'crawler_page_size',
      type: STRING(128),
      allowNull: false,
      comment: '栏目页数',
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
    tableName: 'crawler_column',
    comment: '采集栏目配置表',
  });

  CrawlerColumn.associate = () => {
    // 与CrawlerSite存在一对多关系，所以是hasMany()
    app.model.CrawlerColumn.belongsTo(app.model.CrawlerSite, { foreignKey: 'site_id', targetKey: 'id', as: 'crawlerSite' });
  };
  return CrawlerColumn;
};
