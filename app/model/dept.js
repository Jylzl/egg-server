/**
 * @description: 部门表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:56:30
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const Dept = app.model.define('dept', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '部门ID',
    },
    parent_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '父部门ID：顶级为-1',
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
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'dept',
    comment: '部门表',
  });

  Dept.associate = function() {
    // 与User存在一对多关系，所以是hasMany()
    app.model.Dept.hasMany(app.model.User, { foreignKey: 'id', targetKey: 'id' });
  };

  return Dept;
};
