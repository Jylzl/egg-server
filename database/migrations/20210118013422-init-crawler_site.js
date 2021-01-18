/**
 * @description: 采集站点配置
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-21 10:04:31
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 16:19:52
 */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('crawler_site', { id: Sequelize.INTEGER });
     */
    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('crawler_site', {
      id: {
        field: 'id',
        type: INTEGER(8),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        comment: 'ID',
      },
      name: {
        field: 'name',
        type: STRING(64),
        allowNull: false,
        comment: '站点名称',
      },
      siteId: {
        field: 'site_id',
        type: INTEGER(8),
        allowNull: false,
        comment: '站点ID',
      },
      crawlerSiteName: {
        field: 'crawler_site_name',
        type: STRING(64),
        allowNull: false,
        comment: '采集站点名称',
      },
      crawlerSiteUrl: {
        field: 'crawler_site_url',
        type: STRING(128),
        allowNull: false,
        comment: '采集站点链接',
      },
      desc: {
        field: 'desc',
        type: STRING(200),
        allowNull: false,
        comment: '描述',
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
     * await queryInterface.dropTable('crawler_site');
     */
    await queryInterface.dropTable('crawler_site');
  },
};
