/**
 * @description: 角色菜单表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 12:59:07
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const RoleMenu = app.model.define('role_menu', {
    role_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '角色ID',
    },
    menu_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '菜单ID',
    },
  }, {
    tableName: 'role_menu',
    comment: '角色菜单表',
    timestamps: false,
  });

  RoleMenu.associate = () => {
    app.model.RoleMenu.removeAttribute('id');
  };

  return RoleMenu;
};
