/**
 * @description: 文章数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:40:42
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const ArticleClassify = app.model.define('article_classify', {
    article_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '文章id',
    },
    classify_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '分类id',
    },
  }, {
    tableName: 'article_classify',
    comment: '文章分类关联表',
  });

  return ArticleClassify;
};
