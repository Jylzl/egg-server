/**
 * @description: 用户角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 13:18:44
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const UserRole = app.model.define('user_role', {
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '用户ID',
    },
    role_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '角色ID',
    },
  }, {
    tableName: 'user_role',
    comment: '用户角色表',
    timestamps: false,
  });

  UserRole.associate = () => {
    app.model.UserRole.removeAttribute('id');
  };
  return UserRole;
};
