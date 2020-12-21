/**
 * @description: 字典项表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:47:49
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const SysDictItem = app.model.define('sys_dict_item', {
    id: {
      type: INTEGER(32),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '字典项ID',
    },
    dict_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '字典ID',
    },
    label: {
      type: STRING(100),
      allowNull: false,
      comment: '标签名',
    },
    value: {
      type: STRING(100),
      allowNull: false,
      comment: '数据值',
    },
    description: {
      type: STRING(100),
      allowNull: false,
      comment: '描述',
    },
    remarks: {
      type: STRING(100),
      allowNull: false,
      comment: '备注信息',
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
    tableName: 'sys_dict_item',
    comment: '字典项表',
  });

  SysDictItem.associate = () => {
    // 与SysDict存在一对多关系，所以是hasMany()
    app.model.SysDictItem.belongsTo(app.model.SysDict, { foreignKey: 'dict_id', targetKey: 'id' });
  };

  return SysDictItem;
};
