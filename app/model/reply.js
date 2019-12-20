/**
 * @description: 回复数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 12:57:39
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Reply = app.model.define('reply', {
    reply_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '回复id',
    },
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '该回复用户ID',
    },
    comment_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '该回复对应评论id',
    },
    content: {
      type: STRING(512),
      allowNull: false,
      comment: '回复内容',
    },
  }, {
    tableName: 'reply',
    comment: '回复表',
  });

  return Reply;
};
