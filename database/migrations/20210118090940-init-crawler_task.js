/**
 * @description: 采集栏目配置
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-23 17:52:10
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('crawler_task', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, TINYINT, DATE } = Sequelize;
    await queryInterface.createTable('crawler_task', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: '任务id',
      },
      siteId: {
        field: 'site_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '站点ID',
      },
      columnId: {
        field: 'column_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '栏目ID',
      },
      templateId: {
        field: 'template_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '模板ID',
      },
      title: {
        field: 'title',
        type: STRING(128),
        allowNull: false,
        comment: '文章标题',
      },
      href: {
        field: 'href',
        type: STRING(512),
        allowNull: false,
        comment: '文章链接',
      },
      date: {
        field: 'date',
        type: DATE,
        allowNull: true,
        comment: '文章时间',
      },
      status: {
        field: 'status',
        type: TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '状态: collect_state',
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

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('crawler_task');
     */
    await queryInterface.dropTable('crawler_task');
  },
};
