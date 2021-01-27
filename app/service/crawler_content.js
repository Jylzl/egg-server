/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-27 22:29:52
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
        offset: _offset,
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
  //       offset: _offset,
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
    const { columnId } = params;
    const colum = await ctx.model.CrawlerColumn.findByPk(columnId, {
      include: [{
        model: ctx.model.CrawlerTemplate,
        as: 'taskTemplate',
        // eslint-disable-next-line array-bracket-spacing
        attributes: { exclude: ['createdAt', 'deletedAt', 'desc', 'id', 'name', 'updatedAt'] },
      }],
    });
    const taskTotal = await ctx.model.CrawlerTask.count({
      where: {
        columnId,
      },
    });
    const pageSize = colum.crawlerPageSize;
    const pages = Math.ceil(taskTotal / pageSize);

    // 后台去执行内容采集
    ctx.runInBackground(async () => {
      // 栏目采集状态改成开始
      await ctx.model.CrawlerColumn.update({
        status: 1,
      }, {
        where: {
          id: columnId,
        },
      });
      for (let index = 1; index <= pages; index++) {
        const _offset = (index - 1) * pageSize;
        const tasks = await ctx.model.CrawlerTask.findAndCountAll({
          where: {
            columnId,
          },
          offset: _offset,
          limit: pageSize,
        });
        if (tasks && tasks.count > 0) {
          for (let index = 0; index < tasks.rows.length; index++) {
            const obj = {
              columnId,
              siteId: colum.siteId,
              status: 0,
            };
            const { id, href } = tasks.rows[index];
            if (ctx.helper.urlCompare(colum.crawlerColumnUrl, href, 'host')) {
              const cresult = await ctx.curl(href);
              // toString是为了解析出buffer数据
              const pageXml = cresult.data.toString();
              // decodeEntities参数是为了解决cheerio获取的中文乱码
              const $ = cheerio.load(pageXml, { decodeEntities: false });
              const t = JSON.parse(JSON.stringify(colum.taskTemplate));
              for (const i in t) {
                if (t[i].indexOf('meta') !== -1) {
                  obj[i] = $(t[i]).attr('content');
                } else {
                  obj[i] = $(t[i]).html();
                }
              }
            } else {
              obj.url = href;
            }
            try {
              await ctx.model.CrawlerContent.create(obj);
              // 记录采集任务执行情况(成功)
              await ctx.model.CrawlerTask.update({
                status: 1,
              }, {
                where: {
                  id,
                },
              });
            } catch (error) {
              // 记录采集任务执行情况(失败)
              await ctx.model.CrawlerTask.update({
                status: 2,
                statusInf: error,
              }, {
                where: {
                  id: tasks.rows[index].id,
                },
              });
            }
          }
        }
      }
      // 栏目采集状态改成结束
      await ctx.model.CrawlerColumn.update({
        status: 3,
      }, {
        where: {
          id: columnId,
        },
      });
    });
    return { taskTotal, colum };
  }
}

module.exports = CrawlerContentService;
