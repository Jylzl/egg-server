/**
 * @description: 附件表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 18:15:34
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:49:53
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const SysUpload = app.model.define('sys_upload', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '附件ID',
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: '附件原名称',
    },
    extname: {
      type: CHAR(8),
      allowNull: false,
      comment: '文件扩展名',
    },
    mimeType: {
      type: CHAR(32),
      allowNull: false,
      comment: '文件类型',
    },
    size: {
      type: INTEGER(64),
      allowNull: false,
      comment: '文件大小',
    },
    url: {
      type: STRING(128),
      allowNull: false,
      comment: '资源地址',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'sys_upload',
    comment: '附件表',
  });

  return SysUpload;
};
