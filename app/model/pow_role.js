/**
 * @description: 角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:42:51
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const PowRole = app.model.define('pow_role', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '角色ID',
    },
    name: {
      field: 'name',
      type: STRING(10),
      allowNull: false,
      comment: '角色名称',
    },
    code: {
      field: 'code',
      type: STRING(10),
      allowNull: false,
      comment: '角色标识',
    },
    desc: {
      field: 'desc',
      type: STRING(200),
      allowNull: false,
      comment: '角色描述',
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
    tableName: 'pow_role',
    comment: '角色表',
  });


  PowRole.associate = () => {
    // 与RoleMenu存在一对多关系，所以是hasMany()
    app.model.PowRole.hasMany(app.model.PowRoleMenu, { foreignKey: 'id', targetKey: 'role_id', as: 'powRoleMenu' });
    // 与role存在多对多关系，使用belongsToMany()
    app.model.PowRole.belongsToMany(app.model.PowMenu, {
      through: app.model.PowRoleMenu,
      foreignKey: 'role_id',
      otherKey: 'menu_id',
      as: 'powMenu',
    });
    app.model.PowRole.belongsToMany(app.model.PowUser, {
      through: app.model.PowUserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'powRole',
    });
  };

  return PowRole;
};
