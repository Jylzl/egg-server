/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 12:55:37
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Classifys = app.model.define('classifys', {
    // 分类编号
    classify_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 分类名称
    classify_name: {
      type: STRING(16),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    // 定义表名
    tableName: 'classifys',
    // 表描述
    comment: '文章分类表',
  });

  return Classifys;
};
