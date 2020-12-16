/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-10 22:50:01
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-16 17:43:42
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerController extends Controller {
  async column() {
    const { ctx, service } = this;
    // const res = await service.crawler.index({ url: 'https://news.baidu.com/', dom: '.hotnews a' });
    const res = await service.crawler.column({ url: 'http://www.hubei.gov.cn/zwgk/hbyw/hbywqb/', dom: '.news_list li', item: { title: 'a', href: 'a', time: '.pull-right' } });
    ctx.body = {
      list: res,
      total: res.length,
    };
  }

  async article() {
    const { ctx, service } = this;
    // const res = await service.crawler.index({ url: 'https://news.baidu.com/', dom: '.hotnews a' });
    const data = {
      // url: 'http://www.hubei.gov.cn/zwgk/hbyw/hbywqb/202012/t20201210_3076963.shtml',
      url: 'http://www.xiaogan.gov.cn/tpxw/1167239.jhtml',
      item: {
        ArticleTitle: 'meta[name="ArticleTitle"]',
        PubDate: 'meta[name="PubDate"]',
        ContentSource: 'meta[name="ContentSource"]',
        Description: 'meta[name="Description"]',
        Author: 'meta[name="Author"]',
        Keywords: 'meta[name="Keywords"]',
        Url: 'meta[name="Url"]',
        Content: '#content_txt',
      },
    };
    const res = await service.crawler.article(data);
    ctx.body = {
      article: res,
    };
  }
}

module.exports = CrawlerController;
