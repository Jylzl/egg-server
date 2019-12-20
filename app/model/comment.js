/**
 * @description: 评论数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 12:56:25
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Comment = app.model.define('comment', {
    comment_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '评论id',
    },
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '评论用户id',
    },
    content: {
      type: STRING(512),
      allowNull: false,
      comment: '评论内容',
    },
  }, {
    tableName: 'comment',
    comment: '评论表',
  });

  Comment.associate = function() {
    // 与Comment存在一对多关系，所以是hasMany()
    app.model.Comment.hasMany(app.model.Reply, { foreignKey: 'reply_id', targetKey: 'comment_id' });
  };

  return Comment;
};
