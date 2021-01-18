/**
 * @description: 日志表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:38:48
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const SysLog = app.model.define('sys_log', {
    id: {
      field: 'id',
      type: INTEGER(16),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '日志ID',
    },
    type: {
      field: 'type',
      type: TINYINT(1),
      allowNull: false,
      comment: '类型: （1登录日志 2操作日志）',
    },
    title: {
      field: 'title',
      type: STRING(100),
      comment: '标题',
    },
    ip: {
      field: 'ip',
      type: STRING(16),
      comment: 'IP',
    },
    userName: {
      field: 'user_name',
      type: STRING(16),
      comment: '创建人',
    },
    userId: {
      field: 'user_id',
      type: STRING(100),
      comment: '用户ID',
    },
    requestType: {
      field: 'request_type',
      type: STRING(100),
      comment: '请求类型',
    },
    time: {
      field: 'time',
      type: STRING(100),
      comment: '耗时毫秒',
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
    tableName: 'sys_log',
    comment: '日志表',
  });

  return SysLog;
};
