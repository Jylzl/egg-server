/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:49:03
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 12:55:59
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Securitys = app.model.define('securitys', {
    // 密保编号
    security_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    // 密保内容
    security_content: {
      type: STRING(32),
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    // 定义表名
    tableName: 'securitys',
    // 表描述
    comment: '安全问题表',
  });

  return Securitys;
};
