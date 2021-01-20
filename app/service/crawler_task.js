/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 16:52:14
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerTaskService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerTask.create(params);
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerTask.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerTask.destroy({
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
      result = await ctx.model.CrawlerTask.findAndCountAll({
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.CrawlerTask.findAll();
    }
    return result;
  }

  async progress(params) {
    const { ctx } = this;
    // const result = await ctx.model.CrawlerTask.count({
    //   where: {
    //     column_id: params.id,
    //   },
    // });
    const num = ctx.helper.parseInt(params.num) + 10;
    return num;
  }

  async collect(params) {
    const { ctx } = this;
    let obj = {};
    const result = await ctx.model.CrawlerTask.findByPk(params.id, {
      include: [{
        model: ctx.model.CrawlerColumn,
        as: 'taskColumn',
      }, {
        model: ctx.model.CrawlerTemplate,
        as: 'taskTemplate',
      }],
    });
    if (result) {
      const cresult = await ctx.curl(result.href);
      // toString是为了解析出buffer数据
      const pageXml = cresult.data.toString();
      // decodeEntities参数是为了解决cheerio获取的中文乱码
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      const { articleTitle, author, content, contentSource, description, image, keywords, pubDate, views } = result.taskTemplate;
      const imgs = [];
      $(content + ' img').each((index, element) => {
        const src = ctx.helper.urlSplicing(result.href, $(element).attr('src'));
        $(element).attr('src', src);
        $(element).attr('_src', ctx.helper.urlSplicing(result.href, $(element).attr('_src')));
        imgs.push(src);
      });
      obj = {
        articleTitle: $(articleTitle).attr('content') || $(articleTitle).html(),
        author: $(author).attr('content') || $(author).html(),
        content: $(content).attr('content') || $(content).html(),
        contentSource: $(contentSource).attr('content') || $(contentSource).html(),
        description: $(description).attr('content') || $(description).html(),
        image: ctx.helper.urlSplicing(result.href, $(image).attr('content') || $(image).html()),
        keywords: $(keywords).attr('content') || $(keywords).html(),
        pubDate: ctx.helper.moment($(pubDate).attr('content') || $(pubDate).html(), 'YYYY-MM-DD HH:mm:ss'),
        url: result.href,
        views: $(views).attr('content') || $(views).html(),
        imgs,
      };
    } else {
      obj = {};
    }
    return obj;
  }
}

module.exports = CrawlerTaskService;
