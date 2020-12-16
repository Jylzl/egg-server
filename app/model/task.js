/**
 * @description: 任务表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-12 10:53:01
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:46:18
 */
'use strict';
module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const Task = app.model.define('task', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '任务id',
    },
    title: {
      type: STRING(128),
      allowNull: false,
      comment: '文章标题',
    },
    href: {
      type: STRING(128),
      allowNull: false,
      comment: '文章链接',
    },
    date: {
      type: DATE,
      allowNull: true,
      comment: '文章时间',
    },
    status: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '状态: 0入库',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'task',
    comment: '任务表',
    timestamps: true,
  });

  return Task;
};
