/**
 * @description: 用户信息表
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-07-29 17:59:24
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-17 14:14:47
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 user_inf 表
  up: async (queryInterface, Sequelize) => {
    const { STRING, CHAR, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('user_inf', {
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
    });
  },
  // 在执行数据库降级时调用的函数，删除 user_inf 表
  down: async queryInterface => {
    await queryInterface.dropTable('user_inf');
  },
};
