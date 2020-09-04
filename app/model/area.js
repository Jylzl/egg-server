/**
 * @description: 部门表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 08:49:05
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
      comment: '部门ID',
    },
    name: {
      type: STRING(64),
      allowNull: false,
      comment: '部门名称',
    },
    abbreviation: {
      type: STRING(32),
      allowNull: false,
      comment: '部门简称',
    },
    code: {
      type: STRING(10),
      allowNull: false,
      comment: '部门编号',
    },
    desc: {
      type: STRING(200),
      allowNull: false,
      comment: '部门描述',
    },
    order_num: {
      type: TINYINT(8),
      allowNull: false,
      comment: '排序号',
    },
  }, {
    tableName: 'area',
    comment: '部门表',
  });

  return Area;
};