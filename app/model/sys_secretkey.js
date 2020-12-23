/**
 * @description: 密钥表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 15:32:14
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const SysSecretkey = app.model.define('sys_secretkey', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '密钥ID',
    },
    type: {
      type: STRING(64),
      comment: '类型',
    },
    remarks: {
      type: STRING(100),
      comment: '备注信息',
    },
    app_id: {
      type: STRING(100),
      comment: 'app_id',
    },
    app_secret: {
      type: STRING(100),
      comment: 'app_secret',
    },
    redirect_url: {
      type: STRING(100),
      comment: 'redirect_url',
    },
    description: {
      type: STRING(100),
      comment: '描述',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'sys_secretkey',
    comment: '字典表',
  });

  return SysSecretkey;
};
