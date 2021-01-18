/**
 * @description: 部门表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:01:07
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const PowDept = app.model.define('pow_dept', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '部门ID',
    },
    parentId: {
      field: 'parent_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '父部门ID：顶级为-1',
    },
    name: {
      field: 'name',
      type: STRING(64),
      allowNull: false,
      comment: '部门名称',
    },
    abbreviation: {
      field: 'abbreviation',
      type: STRING(32),
      allowNull: false,
      comment: '部门简称',
    },
    code: {
      field: 'code',
      type: STRING(10),
      allowNull: false,
      comment: '部门编号',
    },
    desc: {
      field: 'desc',
      type: STRING(200),
      allowNull: false,
      comment: '部门描述',
    },
    orderNum: {
      field: 'order_num',
      type: TINYINT(8),
      allowNull: false,
      comment: '排序号',
    },
    createdAt: {
      field: 'created_at',
      type: DATE,
      comment: '创建时间',
    },
    deletedAt: {
      field: 'deleted_at',
      type: DATE,
      comment: '删除时间',
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE,
      comment: '修改时间',
    },
  }, {
    tableName: 'pow_dept',
    comment: '部门表',
  });

  PowDept.associate = () => {
    // 与PowUser存在一对多关系，所以是hasMany()
    app.model.PowDept.hasMany(app.model.PowUser, { foreignKey: 'id', targetKey: 'id' });
  };

  return PowDept;
};
