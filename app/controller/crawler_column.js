/**
 * @description: 采集栏目
 * GET	/api/crawler/column	crawlerColumn	app.controllers.crawlerColumn.index
 * GET	/api/crawler/column/new	new_post	app.controllers.crawlerColumn.new
 * GET	/api/crawler/column/:id	post	app.controllers.crawlerColumn.show
 * GET	/api/crawler/column/:id/edit	edit_post	app.controllers.crawlerColumn.edit
 * POST	/api/crawler/column	crawlerColumn	app.controllers.crawlerColumn.create
 * PUT	/api/crawler/column/:id	post	app.controllers.crawlerColumn.update
 * DELETE	/api/crawler/column/:id	post	app.controllers.crawlerColumn.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 17:36:03
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerColumnController extends Controller {
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
    const res = await service.crawlerColumn.index(query);
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
    const res = await service.crawlerColumn.check(ctx.query);
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
    const res = await service.crawlerColumn.create(ctx.request.body);
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
    const res = await service.crawlerColumn.update(ctx.request.body);
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
    const res = await service.crawlerColumn.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CrawlerColumnController;
