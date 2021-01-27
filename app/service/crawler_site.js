/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 15:58:53
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerSiteService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerSite.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerSite.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerSite.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.CrawlerSite.findAndCountAll({
        offset: _offset,
        limit: pageSize,
      });
    } else {
      result = await ctx.model.CrawlerSite.findAll();
    }
    return result;
  }

  async check(params) {
    const { ctx } = this;
    try {
      const result = await ctx.curl(params.url);
      // toString是为了解析出buffer数据
      const pageXml = result.data.toString();
      // decodeEntities参数是为了解决cheerio获取的中文乱码
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      console.log($('title').text());
      const site = {
        title: $('title').text(),
      };
      return site;
    } catch (error) {
      ctx.throw(500, error);
    }

  }
}

module.exports = CrawlerSiteService;
