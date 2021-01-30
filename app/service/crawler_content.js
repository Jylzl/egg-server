/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-30 18:09:34
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

const minify = require('html-minifier').minify;

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

  async show(params) {
    const { ctx } = this;
    const result = await ctx.model.CrawlerContent.findByPk(params.id);
    return result;
  }

  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, siteId, columnId, articleTitle } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.CrawlerContent.findAndCountAll({
        where: {
          siteId,
          columnId,
          articleTitle: {
            $like: `%${articleTitle}%`,
          },
        },
        // eslint-disable-next-line array-bracket-spacing
        attributes: ['id', 'url', 'articleTitle', 'pubDate', 'status'],
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

  // 任务采集进度
  async progress(query) {
    const { ctx } = this;
    const { columnId } = query;
    const count = await ctx.model.CrawlerContent.count({
      where: {
        columnId,
      },
    });
    const column = await ctx.model.CrawlerColumn.findByPk(columnId);
    return { count, status: column.status };
  }

  // 内容采集
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

    // 保存开始采集时间
    await ctx.model.CrawlerColumn.update({
      status: 3,
    }, {
      where: {
        id: columnId,
      },
    });
    // 后台去执行内容采集
    ctx.runInBackground(async () => {
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
            const { id, href, title, date } = tasks.rows[index];
            const obj = {
              columnId,
              siteId: colum.siteId,
              status: 0,
              isExternallinks: 0,
              url: href,
              articleTitle: title,
              pubDate: date,
              images: [],
              resources: [],
            };
            try {
              const cresult = await ctx.curl(href, {
                timeout: 10000,
              });
              // toString是为了解析出buffer数据
              const pageXml = cresult.data.toString();
              // decodeEntities参数是为了解决cheerio获取的中文乱码
              const $ = cheerio.load(pageXml, { decodeEntities: false });
              const t = JSON.parse(JSON.stringify(colum.taskTemplate));
              // 内容里面的图片资源
              $(t.content + ' img').each((index, element) => {
                const imgSrc = $(element).attr('src');
                if (imgSrc.indexOf('data:') === -1) {
                  obj.images.push(ctx.helper.urlSplicing(href, imgSrc));
                  $(element).attr('src', ctx.helper.urlSplicing(href, imgSrc));
                }
              });
              // 内容里面的附件资源
              $(t.content + ' a').each((index, element) => {
                const aHref = $(element).attr('href');
                obj.resources.push(ctx.helper.urlSplicing(href, aHref));
                $(element).attr('href', ctx.helper.urlSplicing(href, aHref));
              });
              for (const i in t) {
                if (t[i].length > 0) {
                  let value = '';
                  if (t[i].indexOf('$') !== -1) {
                    // eslint-disable-next-line no-eval
                    value = eval(t[i]).replace(/(^\s*)|(\s*$)/g, '');
                    // value = (new Function(`return ${t[i]}`))().replace(/(^\s*)|(\s*$)/g, '');
                  }
                  if (t[i].indexOf('meta') !== -1) {
                    value = $(t[i]).attr('content').replace(/(^\s*)|(\s*$)/g, '');
                  } else {
                    value = $(t[i]).html().replace(/(^\s*)|(\s*$)/g, '');
                  }
                  // 值存在则记录
                  if (value && value.length > 0) {
                    // 对能压缩的html尽量压缩
                    try {
                      // eslint-disable-next-line array-bracket-spacing
                      obj[i] = minify(value, { ignoreCustomFragments: [/\{\{[\s\S]*?\}\}/], removeComments: true, collapseWhitespace: true, minifyJS: false, minifyCSS: false });
                    } catch (error) {
                      obj[i] = value;
                    }
                  }
                }
              }
            } catch (error) {
              // 记录采集任务执行情况(超时)
              await ctx.model.CrawlerTask.update({
                status: 3, // 超时
                statusInf: '采集超时',
              }, {
                where: {
                  id,
                },
              });
            }
            try {
              await ctx.model.CrawlerContent.create(obj);
              // 记录采集任务执行情况(成功)
              await ctx.model.CrawlerTask.update({
                status: 1, // 成功
                statusInf: '采集成功',
              }, {
                where: {
                  id,
                },
              });
            } catch (error) {
              // 记录采集任务执行情况(失败)
              await ctx.model.CrawlerTask.update({
                status: 2, // 失败
                statusInf: '采集失败',
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
        status: 4,
      }, {
        where: {
          id: columnId,
        },
      });
    });
    return colum;
  }
}

module.exports = CrawlerContentService;
