/**
 * @description: 密钥表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:40:33
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysSecretkey = app.model.define('sys_secretkey', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '密钥ID',
    },
    type: {
      field: 'type',
      type: STRING(64),
      comment: '类型',
    },
    remarks: {
      field: 'remarks',
      type: STRING(100),
      comment: '备注信息',
    },
    appId: {
      field: 'app_id',
      type: STRING(100),
      comment: 'app_id',
    },
    appSecret: {
      field: 'app_secret',
      type: STRING(100),
      comment: 'app_secret',
    },
    redirectUrl: {
      field: 'redirect_url',
      type: STRING(100),
      comment: 'redirect_url',
    },
    description: {
      field: 'description',
      type: STRING(100),
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
    tableName: 'sys_secretkey',
    comment: '字典表',
  });

  return SysSecretkey;
};
