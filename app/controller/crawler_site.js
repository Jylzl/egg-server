/**
 * @description: 采集站点
 * GET	/crawlersite	crawlersite	app.controllers.crawlerSite.index
 * GET	/crawlersite/new	new_post	app.controllers.crawlerSite.new
 * GET	/crawlersite/:id	post	app.controllers.crawlerSite.show
 * GET	/crawlersite/:id/edit	edit_post	app.controllers.crawlerSite.edit
 * POST	/crawlersite	crawlersite	app.controllers.crawlerSite.create
 * PUT	/crawlersite/:id	post	app.controllers.crawlerSite.update
 * DELETE	/crawlersite/:id	post	app.controllers.crawlerSite.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 15:46:15
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerSiteController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.crawlerSite.index(query);
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
    const res = await service.crawlerSite.check(ctx.query);
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
    const res = await service.crawlerSite.create(ctx.request.body);
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
    const res = await service.crawlerSite.update(ctx.request.body);
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
    const res = await service.crawlerSite.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CrawlerSiteController;
