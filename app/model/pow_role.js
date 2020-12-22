/**
 * @description: 角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:41:53
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const PowRole = app.model.define('pow_role', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '角色ID',
    },
    name: {
      type: STRING(10),
      allowNull: false,
      comment: '角色名称',
    },
    code: {
      type: STRING(10),
      allowNull: false,
      comment: '角色标识',
    },
    desc: {
      type: STRING(200),
      allowNull: false,
      comment: '角色描述',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'pow_role',
    comment: '角色表',
  });


  PowRole.associate = () => {
    // 与RoleMenu存在一对多关系，所以是hasMany()
    app.model.PowRole.hasMany(app.model.PowRoleMenu, { foreignKey: 'id', targetKey: 'role_id' });
    // 与role存在多对多关系，使用belongsToMany()
    app.model.PowRole.belongsToMany(app.model.PowMenu, {
      through: app.model.PowRoleMenu,
      foreignKey: 'role_id',
      otherKey: 'menu_id',
    });
  };

  return PowRole;
};