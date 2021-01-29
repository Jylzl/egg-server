/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-29 14:21:52
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
    const { currentPage, pageSize, columnId } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.CrawlerTask.findAndCountAll({
        where: {
          columnId,
        },
        offset: _offset,
        limit: pageSize,
      });
    } else {
      result = await ctx.model.CrawlerTask.findAll();
    }
    return result;
  }

  // 任务保存进度
  async progress(query) {
    const { ctx } = this;
    const { columnId } = query;
    const count = await ctx.model.CrawlerTask.count({
      where: {
        columnId,
      },
    });
    const column = await ctx.model.CrawlerColumn.findByPk(columnId);
    return { count, status: column.status };
  }

  async collect(params) {
    const { ctx } = this;
    const colum = await ctx.model.CrawlerColumn.findByPk(params.id);
    if (colum) {
      const { siteId, id, templateId, crawlerReUrl, crawlerStartPage, crawlerEndPage, crawlerColumnUrl, crawlerItem, crawlerItemTitle, crawlerItemUrl, crawlerItemTime } = colum;
      // 解析HTML
      const analysis = function(cresult) {
        const arrs = [];
        // toString是为了解析出buffer数据
        const pageXml = cresult.data.toString();
        // decodeEntities参数是为了解决cheerio获取的中文乱码
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
        status: 1,
        collectStartAt: Date.now(),
      }, {
        where: {
          id,
        },
      });
      // 下单后需要进行一次核对，且不阻塞当前请求
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
          status: 2,
          collectEndAt: Date.now(),
        }, {
          where: {
            id,
          },
        });
      });
    }
    return colum;
  }

  async clear(params) {
    const { ctx } = this;
    const { columnId } = params;
    const delTaskResult = await ctx.model.CrawlerTask.destroy({
      where: {
        columnId,
      },
      force: true,
    });
    const delContentResult = await ctx.model.CrawlerContent.destroy({
      where: {
        columnId,
      },
      force: true,
    });
    await ctx.model.CrawlerColumn.update({
      collectStartAt: null,
      collectEndAt: null,
      status: 0,
    }, {
      where: {
        id: columnId,
      },
    });
    return { delTaskResult, delContentResult };
  }
}

module.exports = CrawlerTaskService;
