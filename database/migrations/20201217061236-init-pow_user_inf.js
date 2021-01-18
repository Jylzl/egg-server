/**
 * @description: 用户信息表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 17:59:24
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 10:09:29
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 pow_user_inf 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('pow_user_inf', {
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
    });
  },
  // 在执行数据库降级时调用的函数，删除 pow_user_inf 表
  down: async queryInterface => {
    await queryInterface.dropTable('pow_user_inf');
  },
};
