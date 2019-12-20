/**
 * @description: 分类数据模型
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 12:50:00
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Classify = app.model.define('classify', {
    classify_id: {
      type: INTEGER(4),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '分类编号',
    },
    title: {
      type: STRING(16),
      allowNull: false,
      comment: '分类名称',
    },
  }, {
    tableName: 'classify',
    comment: '文章分类表',
  });

  Classify.associate = function() {
    // 与Lessison存在多对多关系，使用belongsToMany()
    app.model.Classify.belongsToMany(app.model.Article, {
      through: app.model.ArticleClassify,
      foreignKey: 'article_id',
      otherKey: 'classify_id',
    });
  };

  return Classify;
};
