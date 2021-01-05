/**
 * @description: 用户表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-05 17:59:28
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, TINYINT, DATE } = app.Sequelize;

  const PowUser = app.model.define('pow_user', {
    id: {
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
    dept_id: {
      type: INTEGER(8),
      allowNull: false,
      comment: '部门ID',
    },
    register_ip: {
      type: CHAR(16),
      allowNull: true,
      comment: '用户注册IP',
    },
    register_time: {
      type: DATE,
      allowNull: true,
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
      comment: '用户登录次数',
    },
    session_id: {
      type: CHAR(32),
      allowNull: true,
      comment: '用户session_id',
    },
    created_at: DATE,
    deleted_at: DATE,
    updated_at: DATE,
  }, {
    tableName: 'pow_user',
    comment: '用户表',
  });

  PowUser.associate = () => {
    // 与PowUserInf存在一对一关系，所以是hasOne()
    app.model.PowUser.hasOne(app.model.PowUserInf, { foreignKey: 'user_id' });
    // 与PowUserAuth存在一对多关系，所以是hasMany()
    app.model.PowUser.hasMany(app.model.PowUserAuth, { foreignKey: 'id', targetKey: 'user_id' });
    // 与PowRole存在多对多关系，所以是belongsToMany()
    app.model.PowUser.belongsToMany(app.model.PowRole, {
      through: app.model.PowUserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
  };

  return PowUser;
};
