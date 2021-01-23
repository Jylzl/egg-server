/**
 * @description: 任务表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-12 10:53:01
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-23 17:50:52
 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const CrawlerTask = app.model.define('crawler_task', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '任务id',
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
    templateId: {
      field: 'template_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '模板ID',
    },
    title: {
      field: 'title',
      type: STRING(256),
      allowNull: false,
      comment: '文章标题',
    },
    href: {
      field: 'href',
      type: STRING(512),
      allowNull: false,
      comment: '文章链接',
    },
    date: {
      field: 'date',
      type: DATE,
      allowNull: true,
      comment: '文章时间',
    },
    status: {
      field: 'status',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '状态: collect_state',
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
    tableName: 'crawler_task',
    comment: '采集任务表',
    timestamps: true,
  });

  CrawlerTask.associate = () => {
    // 与CrawlerColumn存在一对多关系，所以是hasMany()
    app.model.CrawlerTask.belongsTo(app.model.CrawlerColumn, { foreignKey: 'columnId', targetKey: 'id', as: 'taskColumn' });
    // 与CrawlerColumn存在一对多关系，所以是hasMany()
    app.model.CrawlerTask.belongsTo(app.model.CrawlerSite, { foreignKey: 'siteId', targetKey: 'id', as: 'taskSite' });
    // 与CrawlerContent存在一对多关系，所以是hasMany()
    app.model.CrawlerTask.belongsTo(app.model.CrawlerTemplate, { foreignKey: 'templateId', targetKey: 'id', as: 'taskTemplate' });
  };
  return CrawlerTask;
};
