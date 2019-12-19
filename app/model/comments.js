/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 12:55:45
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Comments = app.model.define('comments', {
    // 评论编号
    comment_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 当前评论用户
    user_id: {
      type: INTEGER(8),
      allowNull: false,
    },
    // 评论内容
    comment_content: {
      type: STRING(512),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    // 定义表名
    tableName: 'comments',
    // 表描述
    comment: '评论表',
  });

  return Comments;
};
