/**
 * @description: 附件表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 18:15:34
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:37:22
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const SysFile = app.model.define('sys_file', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '附件ID',
    },
    folder: {
      field: 'folder',
      type: STRING(64),
      allowNull: false,
      comment: '存放文件夹',
    },
    name: {
      field: 'name',
      type: STRING(128),
      allowNull: false,
      comment: '附件原名称',
    },
    newName: {
      field: 'new_name',
      type: STRING(64),
      allowNull: false,
      comment: '附件新名称',
    },
    extname: {
      field: 'extname',
      type: CHAR(8),
      allowNull: false,
      comment: '文件扩展名',
    },
    mimetype: {
      field: 'mime_type',
      type: CHAR(128),
      allowNull: false,
      comment: '文件类型',
    },
    size: {
      field: 'size',
      type: INTEGER(64),
      allowNull: false,
      comment: '文件大小',
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
    tableName: 'sys_file',
    comment: '附件表',
  });

  return SysFile;
};
