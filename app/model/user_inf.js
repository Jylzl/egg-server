/**
 * @description: 用户信息表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 14:05:37
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const UserInf = app.model.define('user_inf', {
    id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'ID',
    },
    user_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '用户id',
    },
    real_name: {
      type: STRING(10),
      allowNull: false,
      comment: '真实姓名',
    },
    id_card: {
      type: CHAR(18),
      allowNull: false,
      comment: '身份证号码',
    },
    phone: {
      type: CHAR(11),
      allowNull: false,
      comment: '手机号码',
    },
    email: {
      type: STRING(320),
      allowNull: false,
      comment: '邮箱号码',
    },
    qq: {
      type: STRING(11),
      allowNull: true,
      comment: 'QQ账号',
    },
    github: {
      type: STRING(32),
      allowNull: true,
      comment: 'GitHub地址',
    },
    image_url: {
      type: STRING(320),
      allowNull: true,
      comment: '用户头像地址',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'user_inf',
    comment: '用户信息表',
  });

  UserInf.associate = () => {
    // 与User存在一对一关系，所以是belongsTo()
    app.model.UserInf.belongsTo(app.model.User, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return UserInf;
};
