/**
 * @description: 菜单表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:03:06
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, DATE } = app.Sequelize;

  const PowMenu = app.model.define('pow_menu', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '菜单ID',
    },
    parentId: {
      field: 'parent_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '父菜单ID：顶级为-1',
    },
    name: {
      field: 'name',
      type: STRING(32),
      allowNull: false,
      comment: '菜单名',
    },
    title: {
      field: 'title',
      type: STRING(10),
      allowNull: false,
      comment: '菜单标题',
    },
    url: {
      field: 'url',
      type: STRING(200),
      allowNull: false,
      comment: '菜单路径',
    },
    rurl: {
      field: 'rurl',
      type: STRING(200),
      allowNull: false,
      comment: '重定向路径',
    },
    type: {
      field: 'type',
      type: TINYINT(1),
      allowNull: false,
      comment: '类型: （1目录 2菜单 3按钮）',
    },
    perms: {
      field: 'perms',
      type: STRING(100),
      comment: '权限标识',
    },
    icon: {
      field: 'icon',
      type: STRING(100),
      comment: '图标',
    },
    vidible: {
      field: 'vidible',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '菜单状态（1显示 0隐藏）',
    },
    display: {
      field: 'display',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '禁用（1是 0否）',
    },
    leaf: {
      field: 'leaf',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '是否叶子节点（1是 0否）',
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
    tableName: 'pow_menu',
    comment: '菜单表',
  });

  PowMenu.associate = () => {
    // 与PowRole存在多对多关系，使用belongsToMany()
    app.model.PowMenu.belongsToMany(app.model.PowRole, {
      through: app.model.PowRoleMenu,
      foreignKey: 'menu_id',
      otherKey: 'role_id',
    });
  };

  return PowMenu;
};
