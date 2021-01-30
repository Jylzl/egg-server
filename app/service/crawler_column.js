/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-30 14:33:41
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerColumnService extends Service {

  async create(params) {
    const { ctx } = this;
    try {
      // 计算栏目任务量
      const { crawlerReUrl, crawlerStartPage, crawlerEndPage, crawlerPageSize, crawlerItem } = params;
      const endResult = await ctx.curl(ctx.helper.render(crawlerReUrl, { page: crawlerEndPage }));
      const pageXml = endResult.data.toString();
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      const total = (crawlerEndPage - crawlerStartPage + 1) * crawlerPageSize + $(crawlerItem).length;
      params.crawlerPageTotal = total;
      const result = await ctx.model.CrawlerColumn.create(params, {
        include: [{
          model: ctx.model.CrawlerSite,
          as: 'crawlerSite',
        }],
      });
      return result;
    } catch (error) {
      ctx.helper.error(
        500,
        error,
        '连接超时'
      );
    }
  }

  async update(params) {
    const { ctx } = this;
    try {
      // 计算栏目任务量
      const { crawlerReUrl, crawlerStartPage, crawlerEndPage, crawlerPageSize, crawlerItem } = params;
      const endResult = await ctx.curl(ctx.helper.render(crawlerReUrl, { page: crawlerEndPage }));
      const pageXml = endResult.data.toString();
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      const total = (crawlerEndPage - crawlerStartPage + 1) * crawlerPageSize + $(crawlerItem).length;
      params.crawlerPageTotal = total;
      const result = await ctx.model.CrawlerColumn.update(params, {
        where: {
          id: params.id,
        },
      });
      return result;
    } catch (error) {
      ctx.helper.error(
        500,
        error,
        '连接超时'
      );
    }
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
        }, {
          model: ctx.model.CrawlerTemplate,
          as: 'taskTemplate',
        }],
        offset: _offset,
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

  async collect(params) {
    const { ctx } = this;
    const column = await ctx.model.CrawlerColumn.findByPk(params.id);
    if (column) {
      const { id, siteId, templateId, crawlerReUrl, crawlerStartPage, crawlerEndPage, crawlerColumnUrl, crawlerItem, crawlerItemTitle, crawlerItemUrl, crawlerItemTime } = column;
      // 解析HTML
      // eslint-disable-next-line space-before-function-paren
      const analysis = function (cresult) {
        const arrs = [];
        const pageXml = cresult.data.toString();
        const $ = cheerio.load(pageXml, { decodeEntities: false });
        $(crawlerItem).each((index, element) => {
          arrs.push({
            title: $($(element).find(crawlerItemTitle)).attr('title') || $($(element).find(crawlerItemTitle)).html(),
            href: ctx.helper.urlSplicing(crawlerColumnUrl, $($(element).find(crawlerItemUrl)).attr('href')),
            date: ctx.helper.moment($($(element).find(crawlerItemTime)).html(), 'YYYY-MM-DD HH:mm:ss'),
            siteId,
            columnId: id,
            templateId,
            status: 0,
          });
        });
        return arrs;
      };

      // 保存开始采集时间
      await ctx.model.CrawlerColumn.update({
        collectStartAt: Date.now(),
      }, {
        where: {
          id,
        },
      });

      // 后台采集任务
      ctx.runInBackground(async () => {
        // 这里面的异常都会统统被 Backgroud 捕获掉，并打印错误日志
        // 采集列表第一页
        const startResult = await ctx.curl(crawlerColumnUrl);
        const startArr = analysis(startResult);
        await ctx.model.CrawlerTask.bulkCreate(startArr);

        // 采集列表动态页
        for (let page = crawlerStartPage; page <= crawlerEndPage; page++) {
          const cresult = await ctx.curl(ctx.helper.render(crawlerReUrl, { page }));
          const arrl = analysis(cresult);
          await ctx.model.CrawlerTask.bulkCreate(arrl);
        }
        // 保存开始采集时间
        await ctx.model.CrawlerColumn.update({
          collectEndAt: Date.now(),
        }, {
          where: {
            id,
          },
        });
      });
    }
    return column;
  }
}

module.exports = CrawlerColumnService;
