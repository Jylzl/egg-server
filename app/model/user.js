'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, TINYINT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    user_id: {
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '用户ID',
    },
    name: {
      type: STRING(10),
      allowNull: false,
      comment: '用户名',
    },
    pswd: {
      type: CHAR(32),
      allowNull: false,
      comment: '密码',
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
    security_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '密保问题id',
    },
    security_answer: {
      type: STRING(32),
      allowNull: false,
      comment: '密保答案',
    },
    blog_title: {
      type: STRING(16),
      allowNull: true,
      comment: '博客称呼',
    },
    blog_introduction: {
      type: STRING(32),
      allowNull: true,
      comment: '博客简介',
    },
    image_url: {
      type: STRING(320),
      allowNull: true,
      comment: '用户头像地址',
    },
    image_type: {
      type: TINYINT(3),
      allowNull: false,
      comment: '用户头像选择',
    },
    register_ip: {
      type: CHAR(16),
      allowNull: false,
      comment: '用户注册IP',
    },
    register_time: {
      type: DATE,
      allowNull: false,
      comment: '用户注册时间',
    },
    last_login_ip: {
      type: CHAR(16),
      allowNull: true,
      comment: '用户最后登录IP',
    },
    last_login_time: {
      type: DATE,
      allowNull: true,
      comment: '用户最后登录时间',
    },
    status: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '用户状态: 1表示在线，0离线',
    },
    login_count: {
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '用户状态: 1表示在线，0离线',
    },
    session_id: {
      type: CHAR(32),
      allowNull: true,
      comment: '用户session_id',
    },
  }, {
    tableName: 'user',
    comment: '用户表',
  });

  User.associate = function() {
    // 与Article存在一对多关系，所以是hasMany()
    app.model.User.hasMany(app.model.Article, { foreignKey: 'article_id', targetKey: 'user_id' });
    // 与Classify存在一对多关系，所以是hasMany()
    app.model.User.hasMany(app.model.Classify, { foreignKey: 'classify_id', targetKey: 'user_id' });
    // 与UserAuths存在一对多关系，所以是hasMany()
    app.model.User.hasMany(app.model.UserAuths, { foreignKey: 'id', targetKey: 'user_id' });
  };

  return User;
};
