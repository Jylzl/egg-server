/**
 * @description: 角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 09:16:08
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Role = app.model.define('role', {
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
  }, {
    tableName: 'role',
    comment: '角色表',
  });


  Role.associate = function() {
    // 与RoleMenu存在一对多关系，所以是hasMany()
    app.model.Role.hasMany(app.model.RoleMenu, { foreignKey: 'id', targetKey: 'role_id' });
  };

  return Role;
};
