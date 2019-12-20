/**
 * @description: 文章数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 12:49:28
 */
'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, BOOLEAN } = app.Sequelize;

  const Article = app.model.define('article', {
    article_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '文章id',
    },
    title: {
      type: STRING(256),
      allowNull: false,
      comment: '文章标题',
    },
    content: {
      type: TEXT,
      allowNull: false,
      comment: '文章内容',
    },
    // 文章摘要
    description: {
      type: STRING(256),
      allowNull: false,
      comment: '文章id',
    },
    tags: {
      type: STRING(256),
      allowNull: true,
      comment: '文章自定义标签',
    },
    view: {
      type: INTEGER(8),
      allowNull: false,
      defaultValue: 0,
      comment: '文章阅读量',
    },
    status: {
      type: INTEGER(2),
      allowNull: false,
      defaultValue: 0,
      comment: '文章状态',
    },
    top_level: {
      type: INTEGER(2),
      allowNull: false,
      defaultValue: 0,
      comment: '文章固顶级别',
    },
    is_comment: {
      type: BOOLEAN(1),
      allowNull: false,
      defaultValue: 1,
      comment: '文章是否可以评论，0不能，1可以',
    },
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '关联用户ID',
    },
  }, {
    tableName: 'article',
    comment: '文章表',
  });

  Article.associate = function() {
    // 与Comment存在一对多关系，所以是hasMany()
    app.model.Article.hasMany(app.model.Comment, { foreignKey: 'comment_id', targetKey: 'article_id' });
    // 与Lessison存在多对多关系，使用belongsToMany()
    app.model.Article.belongsToMany(app.model.Classify, {
      through: app.model.ArticleClassify,
      foreignKey: 'article_id',
      otherKey: 'classify_id',
    });
  };

  return Article;
};
