/**
 * @description: 第三方登录关联表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:55:05
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:07:01
 */
'use strict';

module.exports = app => {
  const { CHAR, INTEGER, DATE } = app.Sequelize;

  const PowUserAuth = app.model.define('pow_user_auth', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: '第三方自增ID',
    },
    userId: {
      field: 'user_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '关联user用户id',
    },
    uid: {
      field: 'uid',
      type: CHAR(32),
      allowNull: false,
      comment: '三方登陆唯一标识',
    },
    provider: {
      field: 'provider',
      type: CHAR(10),
      allowNull: false,
      comment: '三方登陆类型',
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
    tableName: 'pow_user_auth',
    comment: '第三方登陆',
  });

  PowUserAuth.associate = () => {
    // 与PowUserAuth存在一对多关系，所以是hasMany()
    app.model.PowUserAuth.belongsTo(app.model.PowUser, { foreignKey: 'user_id', targetKey: 'id' });
  };

  return PowUserAuth;
};
