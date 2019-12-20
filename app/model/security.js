/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:41:06
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Security = app.model.define('security', {
    security_id: {
      type: INTEGER(4),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '密保id',
    },
    question: {
      type: STRING(32),
      allowNull: false,
      comment: '密保问题',
    },
  }, {
    tableName: 'security',
    comment: '安全问题表',
  });

  return Security;
};
