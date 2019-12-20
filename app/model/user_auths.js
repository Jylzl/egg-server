/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:55:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:41:15
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
    third_key: {
      type: CHAR(32),
      allowNull: false,
      comment: '三方登陆唯一标识',
    },
    third_type: {
      type: CHAR(10),
      allowNull: false,
      comment: '三方登陆类型',
    },
  }, {
    tableName: 'user_auths',
    comment: '第三方登陆',
  });

  return UserAuths;
};
