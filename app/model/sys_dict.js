/**
 * @description: 字典表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 14:14:25
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const SysDict = app.model.define('sys_dict', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '字典ID',
    },
    name: {
      field: 'id',
      type: STRING(100),
      allowNull: false,
      comment: '名称',
    },
    valueType: {
      field: 'value_type',
      type: STRING(64),
      allowNull: false,
      comment: '数据类型',
    },
    type: {
      field: 'type',
      type: TINYINT(1),
      allowNull: false,
      comment: '类型: （1系统类 2业务类）',
    },
    description: {
      field: 'description',
      type: STRING(100),
      allowNull: false,
      comment: '描述',
    },
    remarks: {
      field: 'remarks',
      type: STRING(100),
      allowNull: false,
      comment: '备注信息',
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
    tableName: 'sys_dict',
    comment: '字典表',
  });

  SysDict.associate = () => {
    // 与SysDictItem存在一对多关系，所以是hasMany()
    app.model.SysDict.hasMany(app.model.SysDictItem, { foreignKey: 'dict_id', targetKey: 'id', as: 'sysDictItem' });
  };

  return SysDict;
};
