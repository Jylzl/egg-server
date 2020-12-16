/**
 * @description: 用户角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:09:20
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
  });

  UserRole.associate = function() {
    // 与UserAuth存在一对多关系，所以是hasMany()
    app.model.UserAuth.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return UserRole;
};
