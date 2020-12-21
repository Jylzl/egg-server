/**
 * @description: 用户角色表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 11:45:51
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const PowUserRole = app.model.define('pow_user_role', {
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
    tableName: 'pow_user_role',
    comment: '用户角色表',
    timestamps: false,
  });

  PowUserRole.associate = () => {
    app.model.PowUserRole.removeAttribute('id');
  };
  return PowUserRole;
};
