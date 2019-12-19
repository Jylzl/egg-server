/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 12:55:52
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Replys = app.model.define('replys', {
    // 回复编号
    reply_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 该回复用户ID
    user_id: {
      type: INTEGER(8),
      allowNull: false,
    },
    // 该回复对应评论编号
    comment_no: {
      type: INTEGER(8),
      allowNull: false,
    },
    // 回复内容
    reply_content: {
      type: STRING(512),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    // 定义表名
    tableName: 'replys',
    // 表描述
    comment: '回复表',
  });

  return Replys;
};
