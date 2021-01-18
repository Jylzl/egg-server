/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 17:40:58
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerColumnService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerColumn.create(params, {
      include: [{
        model: ctx.model.CrawlerSite,
        as: 'crawlerSite',
      }],
    });
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerColumn.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerColumn.destroy({
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, siteId } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.CrawlerColumn.findAndCountAll({
        where: {
          siteId,
        },
        include: [{
          model: ctx.model.CrawlerSite,
          as: 'crawlerSite',
        }],
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.CrawlerColumn.findAll();
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

module.exports = CrawlerColumnService;
