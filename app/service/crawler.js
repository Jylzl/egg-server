/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:50:40
 */
'use strict';
const cheerio = require('cheerio');

const Service = require('egg').Service;

class CrawlerSrvice extends Service {

  async column(params) {
    const { ctx } = this;
    const arr = [];
    for (let index = 1; index <= 50; index++) {
      const result = await ctx.curl(`${params.url}index_${index}.shtml`);
      // toString是为了解析出buffer数据
      const pageXml = result.data.toString();
      // decodeEntities参数是为了解决cheerio获取的中文乱码
      const $ = cheerio.load(pageXml, { decodeEntities: false });
      $(params.dom).each((index, element) => {
        // console.log('==============');
        // console.log(element);
        arr.push({
          title: $($(element).find(params.item.title)).attr('title') || $($(element).find(params.item.title)).html(),
          href: ctx.helper.urlSplicing(params.url, $($(element).find(params.item.href)).attr('href')),
          date: ctx.helper.moment($($(element).find(params.item.time)).html(), 'YYYY-MM-DD HH:mm:ss'),
        });
      });
    }
    const result = await ctx.model.Task.bulkCreate(arr);
    return result;
  }

  async article(params) {
    const { ctx } = this;
    const result = await ctx.curl(params.url);
    // toString是为了解析出buffer数据
    const pageXml = result.data.toString();
    // decodeEntities参数是为了解决cheerio获取的中文乱码
    const $ = cheerio.load(pageXml, { decodeEntities: false });
    $(params.item.Content + ' img').each((index, element) => {
      $(element).attr('src', ctx.helper.urlSplicing(params.url, $(element).attr('src')));
      $(element).attr('_src', ctx.helper.urlSplicing(params.url, $(element).attr('_src')));
    });
    const inf = {
      ArticleTitle: $(params.item.ArticleTitle).attr('content'),
      PubDate: ctx.helper.moment($(params.item.PubDate).attr('content'), 'YYYY-MM-DD HH:mm:ss'),
      ContentSource: $(params.item.ContentSource).attr('content'),
      Description: $(params.item.Description).attr('content'),
      Author: $(params.item.Author).attr('content'),
      Keywords: $(params.item.Keywords).attr('content'),
      Url: $(params.item.Url).attr('content'),
      Content: $(params.item.Content).html(),
    };
    return inf;
  }
}

module.exports = CrawlerSrvice;
