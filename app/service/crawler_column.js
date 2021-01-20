/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-20 22:45:48
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

  async collect(params) {
    const { ctx } = this;
    let total = 0;
    const result = await ctx.model.CrawlerColumn.findByPk(params.id);
    // 解析HTML
    function analysis(cresult) {
      const arrs = [];
      // toString是为了解析出buffer数据
      const pageXml = cresult.data.toString();
      // decodeEntities参数是为了解决cheerio获取的中文乱码
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      $(result.crawlerItem).each((index, element) => {
        arrs.push({
          title: $($(element).find(result.crawlerItemTitle)).attr('title') || $($(element).find(result.crawlerItemTitle)).html(),
          href: ctx.helper.urlSplicing(result.crawlerColumnUrl, $($(element).find(result.crawlerItemUrl)).attr('href')),
          date: ctx.helper.moment($($(element).find(result.crawlerItemTime)).html(), 'YYYY-MM-DD HH:mm:ss'),
          siteId: result.siteId,
          columnId: result.id,
          templateId: result.templateId,
          status: 0,
        });
      });
      return arrs;
    }


    if (result) {
      const { crawlerReUrl, crawlerStartPage, crawlerEndPage, crawlerPageSize } = result;
      // 计算最后一页数据
      const endResult = await ctx.curl(ctx.helper.render(crawlerReUrl, { page: crawlerEndPage }));
      const endArr = analysis(endResult);
      total = (crawlerEndPage - crawlerStartPage + 1) * crawlerPageSize + endArr.length;
      // 下单后需要进行一次核对，且不阻塞当前请求
      ctx.runInBackground(async () => {
        // 这里面的异常都会统统被 Backgroud 捕获掉，并打印错误日志
        // 采集列表第一页
        const startResult = await ctx.curl(result.crawlerColumnUrl);
        const startArr = analysis(startResult);
        await ctx.model.CrawlerTask.bulkCreate(startArr);

        // 采集列表动态页
        for (let page = crawlerStartPage; page <= crawlerEndPage; page++) {
          const cresult = await ctx.curl(ctx.helper.render(crawlerReUrl, { page }));
          const arrl = analysis(cresult);
          await ctx.model.CrawlerTask.bulkCreate(arrl);
        }
      });
    }
    // const crawlerStartPage = result.crawlerStartPage;
    // const currentPage = ctx.helper.parseInt(params.currentPage);
    // let page;
    // if (crawlerStartPage === 2) {
    //   page = currentPage;
    // } else {
    //   page = ctx.helper.parseInt(currentPage + (crawlerStartPage - 2));
    // }
    // const url = currentPage === 1 ? result.crawlerColumnUrl : ctx.helper.render(result.crawlerReUrl, { page });
    // const cresult = await ctx.curl(url);
    // // toString是为了解析出buffer数据
    // const pageXml = cresult.data.toString();
    // // decodeEntities参数是为了解决cheerio获取的中文乱码
    // const $ = cheerio.load(pageXml, { decodeEntities: false });
    // $(result.crawlerItem).each((index, element) => {
    //   arr.push({
    //     title: $($(element).find(result.crawlerItemTitle)).attr('title') || $($(element).find(result.crawlerItemTitle)).html(),
    //     href: ctx.helper.urlSplicing(result.crawlerColumnUrl, $($(element).find(result.crawlerItemUrl)).attr('href')),
    //     date: ctx.helper.moment($($(element).find(result.crawlerItemTime)).html(), 'YYYY-MM-DD HH:mm:ss'),
    //     siteId: result.siteId,
    //     columnId: result.columnId,
    //     templateId: result.templateId,
    //     status: 0,
    //   });
    // });
    // // const sresult = await ctx.model.CrawlerTask.bulkCreate(arr);
    // const tresult = await ctx.model.CrawlerTask.count({
    //   where: {
    //     column_id: result.columnId,
    //   },
    // });
    // return sresult;
    return {
      total,
      result,
    };
  }
}

module.exports = CrawlerColumnService;
