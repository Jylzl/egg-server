/**
 * @description: 附件数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 18:15:34
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 18:23:38
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const Upload = app.model.define('upload', {
    upload_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '附件ID',
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: '附件',
    },
    extname: {
      type: CHAR(8),
      allowNull: false,
      comment: '文件扩展名',
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
    },
    update_time: {
      type: DATE,
      allowNull: false,
      comment: '修改时间',
    },
  }, {
    tableName: 'upload',
    comment: '附件表',
  });

  return Upload;
};
