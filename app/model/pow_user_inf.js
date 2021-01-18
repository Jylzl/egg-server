/**
 * @description: 用户信息表
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 08:30:57
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 11:38:23
 */
'use strict';

module.exports = app => {
  const { STRING, CHAR, INTEGER, DATE } = app.Sequelize;

  const PowUserInf = app.model.define('pow_user_inf', {
    id: {
      field: 'id',
      type: INTEGER(8),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      comment: 'ID',
    },
    userId: {
      field: 'user_id',
      type: INTEGER(8),
      allowNull: false,
      comment: '用户id',
    },
    realName: {
      field: 'real_name',
      type: STRING(10),
      allowNull: false,
      comment: '真实姓名',
    },
    idCard: {
      field: 'id_card',
      type: CHAR(18),
      allowNull: false,
      comment: '身份证号码',
    },
    phone: {
      field: 'phone',
      type: CHAR(11),
      allowNull: false,
      comment: '手机号码',
    },
    email: {
      field: 'email',
      type: STRING(320),
      allowNull: false,
      comment: '邮箱号码',
    },
    qq: {
      field: 'qq',
      type: STRING(11),
      allowNull: true,
      comment: 'QQ账号',
    },
    github: {
      field: 'github',
      type: STRING(32),
      allowNull: true,
      comment: 'GitHub地址',
    },
    imageUrl: {
      field: 'image_url',
      type: STRING(320),
      allowNull: true,
      comment: '用户头像地址',
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
    tableName: 'pow_user_inf',
    comment: '用户信息表',
  });

  PowUserInf.associate = () => {
    // 与PowUser存在一对一关系，所以是belongsTo()
    app.model.PowUserInf.belongsTo(app.model.PowUser, { foreignKey: 'user_id', targetKey: 'id', as: 'powUserInf' });
  };

  return PowUserInf;
};
