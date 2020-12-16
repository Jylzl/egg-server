/**
 * @description: 用户部门表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 18:09:12
 */
'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const UserDept = app.model.define('user_dept', {
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '用户ID',
    },
    dept_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '部门ID',
    },
  }, {
    tableName: 'user_dept',
    comment: '用户部门表',
  });

  UserDept.associate = function() {
    // 与UserAuth存在一对多关系，所以是hasMany()
    app.model.UserAuth.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' });
  };
  return UserDept;
};
