/**
 * @description: 用户表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:40:15
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, TINYINT, DATE } = app.Sequelize;

  const PowUser = app.model.define('pow_user', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '用户ID',
    },
    name: {
      field: 'name',
      type: STRING(10),
      allowNull: false,
      comment: '用户名',
    },
    pswd: {
      field: 'pswd',
      type: CHAR(32),
      allowNull: false,
      comment: '密码',
    },
    deptId: {
      field: 'dept_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '部门ID',
    },
    registerIp: {
      field: 'register_ip',
      type: CHAR(16),
      allowNull: true,
      comment: '用户注册IP',
    },
    registerTime: {
      field: 'register_time',
      type: DATE,
      allowNull: true,
      comment: '用户注册时间',
    },
    lastLoginIp: {
      field: 'last_login_ip',
      type: CHAR(16),
      allowNull: true,
      comment: '用户最后登录IP',
    },
    lastLoginTime: {
      field: 'last_login_time',
      type: DATE,
      allowNull: true,
      comment: '用户最后登录时间',
    },
    status: {
      field: 'status',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '用户状态: 1表示在线，0离线',
    },
    loginCount: {
      field: 'login_count',
      type: TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '用户登录次数',
    },
    sessionId: {
      field: 'session_id',
      type: CHAR(32),
      allowNull: true,
      comment: '用户session_id',
    },
    createdAt: {
      field: 'created_at',
      type: DATE,
      comment: '创建时间',
    },
    deletedAt: {
      field: 'deleted_at',
      type: DATE,
      comment: '删除时间',
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE,
      comment: '修改时间',
    },
  }, {
    tableName: 'pow_user',
    comment: '用户表',
  });

  PowUser.associate = () => {
    // 与PowUserInf存在一对一关系，所以是hasOne()
    app.model.PowUser.hasOne(app.model.PowUserInf, { foreignKey: 'user_id', as: 'powUserInf' });
    // 与PowUserAuth存在一对多关系，所以是hasMany()
    app.model.PowUser.hasMany(app.model.PowUserAuth, { foreignKey: 'id', targetKey: 'user_id' });
    // 与PowRole存在多对多关系，所以是belongsToMany()
    app.model.PowUser.belongsToMany(app.model.PowRole, {
      through: app.model.PowUserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'powRole',
    });
  };

  return PowUser;
};
