/**
 * @description: 角色菜单表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:04:25
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const PowRoleMenu = app.model.define('pow_role_menu', {
    roleId: {
      field: 'role_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '角色ID',
    },
    menuId: {
      field: 'menu_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '菜单ID',
    },
  }, {
    tableName: 'pow_role_menu',
    comment: '角色菜单表',
    timestamps: false,
  });

  PowRoleMenu.associate = () => {
    app.model.PowRoleMenu.removeAttribute('id');
  };

  return PowRoleMenu;
};
