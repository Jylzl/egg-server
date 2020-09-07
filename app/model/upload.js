/**
 * @description: 附件表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 18:15:34
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-07 10:31:04
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE, NOW } = app.Sequelize;

  const Upload = app.model.define('upload', {
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
    create_time: {
      type: DATE,
      allowNull: false,
      comment: '创建时间',
      defaultValue: NOW,
    },
    update_time: {
      type: DATE,
      allowNull: false,
      comment: '修改时间',
      defaultValue: NOW,
    },
  }, {
    tableName: 'upload',
    comment: '附件表',
  });

  return Upload;
};
