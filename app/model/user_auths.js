/**
 * @description: 第三方登录关联表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:55:05
 * @LastAuthor: lizlong
 * @lastTime: 2020-07-30 09:39:30
 */
'use strict';

module.exports = app => {
  const { CHAR, INTEGER } = app.Sequelize;

  const UserAuths = app.model.define('user_auths', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '第三方自增ID',
    },
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '关联user用户id',
    },
    uid: {
      type: CHAR(32),
      allowNull: false,
      comment: '三方登陆唯一标识',
    },
    provider: {
      type: CHAR(10),
      allowNull: false,
      comment: '三方登陆类型',
    },
  }, {
    tableName: 'user_auths',
    comment: '第三方登陆',
  });

  UserAuths.associate = function() {
    // 与UserAuths存在一对多关系，所以是hasMany()
    app.model.UserAuths.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return UserAuths;
};
