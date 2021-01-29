/**
 * @description: 采集栏目
 * GET	/api/crawler/content	crawlerContent	app.controllers.crawlerContent.index
 * GET	/api/crawler/content/new	new_post	app.controllers.crawlerContent.new
 * GET	/api/crawler/content/:id	post	app.controllers.crawlerContent.show
 * GET	/api/crawler/content/:id/edit	edit_post	app.controllers.crawlerContent.edit
 * POST	/api/crawler/content	crawlerContent	app.controllers.crawlerContent.create
 * PUT	/api/crawler/content/:id	post	app.controllers.crawlerContent.update
 * DELETE	/api/crawler/content/:id	post	app.controllers.crawlerContent.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-29 14:06:36
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerContentController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
      siteId: ctx.helper.parseInt(ctx.query.siteId),
    };
    const res = await service.crawlerContent.index(query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async new() {
    const {
      ctx,
    } = this;
    ctx.helper.success({
      ctx,
      res: {
        a: 22111,
      },
    });
  }

  async create() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.create(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async show() {
    const {
      ctx,
    } = this;
    ctx.helper.success({
      ctx,
      res: {
        a: 111,
      },
    });
  }

  async edit() {
    const {
      ctx,
    } = this;
    ctx.helper.success({
      ctx,
      res: {
        a: 111,
      },
    });
  }

  async update() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.update(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async check() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.check(ctx.query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 采集进度
  async progress() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.progress(ctx.query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async collect() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerContent.collect(ctx.query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

}

module.exports = CrawlerContentController;
