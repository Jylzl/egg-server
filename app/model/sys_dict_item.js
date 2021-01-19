/**
 * @description: 字典项表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 12:47:30
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const SysDictItem = app.model.define('sys_dict_item', {
    id: {
      field: 'id',
      type: INTEGER(32),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '字典项ID',
    },
    dictId: {
      field: 'dict_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '字典ID',
    },
    label: {
      field: 'label',
      type: STRING(100),
      allowNull: false,
      comment: '标签名',
    },
    value: {
      field: 'value',
      type: STRING(100),
      allowNull: false,
      comment: '数据值',
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
    tableName: 'sys_dict_item',
    comment: '字典项表',
  });

  SysDictItem.associate = () => {
    // 与SysDict存在一对多关系，所以是hasMany()
    app.model.SysDictItem.belongsTo(app.model.SysDict, { foreignKey: 'dict_id', targetKey: 'id', as: 'sysDict' });
  };

  return SysDictItem;
};
