/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 09:30:26
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-20 10:15:26
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 article_classify 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize;
    await queryInterface.createTable('article_classify', {
      article_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '文章id',
      },
      classify_id: {
        type: INTEGER(8),
        allowNull: false,
        comment: '分类id',
      },
    });
  },
  // 在执行数据库降级时调用的函数，删除 article_classify 表
  down: async queryInterface => {
    await queryInterface.dropTable('article_classify');
  },
};
