/**
 * @description: 部门表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-28 00:28:16
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT } = app.Sequelize;

  const Area = app.model.define('area', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '地区ID',
    },
    parent_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '父部门ID：顶级为-1',
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: '地区名称',
    },
    abbreviation: {
      type: STRING(32),
      allowNull: false,
      comment: '地区简称',
    },
    code: {
      type: STRING(10),
      allowNull: false,
      comment: '地区编号',
    },
    desc: {
      type: STRING(200),
      allowNull: false,
      comment: '地区描述',
    },
    order_num: {
      type: TINYINT(8),
      allowNull: false,
      comment: '排序号',
    },
  }, {
    tableName: 'area',
    comment: '地区表',
  });

  return Area;
};
