/**
 * @description: 附件表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 18:15:34
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 16:54:12
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const SysFile = app.model.define('sys_file', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '附件ID',
    },
    folder: {
      type: STRING(64),
      allowNull: false,
      comment: '存放文件夹',
    },
    name: {
      type: STRING(128),
      allowNull: false,
      comment: '附件原名称',
    },
    new_name: {
      type: STRING(64),
      allowNull: false,
      comment: '附件新名称',
    },
    extname: {
      type: CHAR(8),
      allowNull: false,
      comment: '文件扩展名',
    },
    mime_type: {
      type: CHAR(128),
      allowNull: false,
      comment: '文件类型',
    },
    size: {
      type: INTEGER(64),
      allowNull: false,
      comment: '文件大小',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'sys_file',
    comment: '附件表',
  });

  return SysFile;
};
