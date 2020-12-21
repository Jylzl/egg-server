/**
 * @description: 字典表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 16:28:10
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const SysDict = app.model.define('sys_dict', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '字典ID',
    },
    name: {
      type: STRING(100),
      allowNull: false,
      comment: '分类',
    },
    type: {
      type: TINYINT(1),
      allowNull: false,
      comment: '类型: （1系统类 2业务类）',
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
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'sys_dict',
    comment: '字典表',
  });

  SysDict.associate = () => {
    // 与SysDictItem存在一对多关系，所以是hasMany()
    app.model.SysDict.hasMany(app.model.SysDictItem, { foreignKey: 'dict_id', targetKey: 'id' });
  };

  return SysDict;
};
