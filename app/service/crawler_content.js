/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-22 18:29:52
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerContentService extends Service {

  async create(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerContent.create(params, {
      include: [{
        model: ctx.model.CrawlerColumn,
        as: 'contentColumn',
      }],
    });
    return result;
  }

  async update(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerContent.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }

  async destroy(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerContent.destroy({
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
      result = await ctx.model.CrawlerContent.findAndCountAll({
        where: {
          siteId,
        },
        include: [{
          model: ctx.model.CrawlerColumn,
          as: 'contentColumn',
        }],
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.CrawlerContent.findAll();
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

  // async collect(params) {
  //   const { ctx } = this;
  //   let obj = {};
  //   const taskObj = {};
  //   const task = await ctx.model.CrawlerTask.findByPk(params.id, {
  //     include: [{
  //       model: ctx.model.CrawlerColumn,
  //       as: 'taskColumn',
  //     }, {
  //       model: ctx.model.CrawlerTemplate,
  //       as: 'taskTemplate',
  //     }],
  //   });
  //   const taskTotal = await ctx.model.CrawlerTask.count({
  //     where: {
  //       columnId: task.columnId,
  //     },
  //   });
  //   const pageSize = task.taskColumn.crawlerPageSize;
  //   const pages = Math.ceil(taskTotal / pageSize);
  //   function collectContent(params) {
  //     console.log(params.id);
  //   }
  //   for (let index = 1; index <= pages; index++) {
  //     const _offset = (index - 1) * pageSize;
  //     const tasks = await ctx.model.CrawlerTask.findAndCountAll({
  //       where: {
  //         columnId: task.columnId,
  //       },
  //       // offet去掉前多少个数据
  //       offset: _offset,
  //       // limit每页数据数量
  //       limit: pageSize,
  //       include: [{
  //         model: ctx.model.CrawlerColumn,
  //         as: 'taskColumn',
  //       }, {
  //         model: ctx.model.CrawlerTemplate,
  //         as: 'taskTemplate',
  //       }],
  //     });
  //     for (let index = 0; index < tasks.length; index++) {
  //       collectContent(tasks[index]);
  //     }
  //   }
  //   if (task) {
  //     taskObj.id = task.id;
  //     // 文章url和栏目url是同一域名的做采集，否则只记录url做外链
  //     if (ctx.helper.urlCompare(task.href, task.taskColumn.crawlerColumnUrl, 'host')) {
  //       const cresult = await ctx.curl(task.href);
  //       // toString是为了解析出buffer数据
  //       const pageXml = cresult.data.toString();
  //       // decodeEntities参数是为了解决cheerio获取的中文乱码
  //       const $ = cheerio.load(pageXml, { decodeEntities: false });
  //       const { articleTitle, author, content, contentSource, description, image, keywords, pubDate, views } = task.taskTemplate;
  //       const imgs = [];
  //       const as = [];
  //       $(content + ' img').each((index, element) => {
  //         const src = ctx.helper.urlSplicing(task.href, $(element).attr('src'));
  //         $(element).attr('src', src);
  //         $(element).attr('_src', ctx.helper.urlSplicing(task.href, $(element).attr('_src')));
  //         imgs.push(src);
  //       });
  //       $(content + ' a').each((index, element) => {
  //         const href = ctx.helper.urlSplicing(task.href, $(element).attr('href'));
  //         $(element).attr('href', href);
  //         as.push(href);
  //       });
  //       obj = {
  //         articleTitle: $(articleTitle).attr('content') || $(articleTitle).html(),
  //         author: $(author).attr('content') || $(author).html(),
  //         content: $(content).attr('content') || $(content).html(),
  //         contentSource: $(contentSource).attr('content') || $(contentSource).html(),
  //         description: $(description).attr('content') || $(description).html(),
  //         image: ctx.helper.urlSplicing(task.href, $(image).attr('content') || $(image).html()),
  //         keywords: $(keywords).attr('content') || $(keywords).html(),
  //         pubDate: ctx.helper.moment($(pubDate).attr('content') || $(pubDate).html(), 'YYYY-MM-DD HH:mm:ss'),
  //         url: task.href,
  //         views: $(views).attr('content') || $(views).html(),
  //         imgs,
  //         as,
  //         task,
  //         taskTotal,
  //       };
  //     } else {
  //       obj = {
  //         url: task.href,
  //         task,
  //         taskTotal,
  //       };
  //     }
  //     taskObj.status = 1;
  //   } else {
  //     obj = {};
  //     taskObj.status = 1;
  //   }
  //   await ctx.model.CrawlerTask.update(taskObj, {
  //     where: {
  //       id: taskObj.id,
  //     },
  //   });
  //   return obj;
  // }

  async collect(params) {
    const { ctx } = this;
    const colum = await ctx.model.CrawlerColumn.findByPk(params.id, {
      include: [{
        model: ctx.model.CrawlerTemplate,
        as: 'taskTemplate',
      }],
    });
    const task = await ctx.model.CrawlerTask.findByPk(params.id, {
      include: [{
        model: ctx.model.CrawlerColumn,
        as: 'taskColumn',
      }, {
        model: ctx.model.CrawlerTemplate,
        as: 'taskTemplate',
      }],
    });
    const taskTotal = await ctx.model.CrawlerTask.count({
      where: {
        columnId: task.columnId,
      },
    });
    const pageSize = task.taskColumn.crawlerPageSize;
    const pages = Math.ceil(taskTotal / pageSize);
    for (let index = 1; index <= pages; index++) {
      const _offset = (index - 1) * pageSize;
      const tasks = await ctx.model.CrawlerTask.findAndCountAll({
        where: {
          columnId: task.columnId,
        },
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
        include: [{
          model: ctx.model.CrawlerColumn,
          as: 'taskColumn',
        }, {
          model: ctx.model.CrawlerTemplate,
          as: 'taskTemplate',
        }],
      });
      for (let index = 0; index < tasks.count.rows; index++) {
        console.log(tasks.rows[index].id);
      }
    }
    return { task, taskTotal, colum };
  }
}

module.exports = CrawlerContentService;
