/**
 * @description: 采集任务
 * GET	/api/crawler/task	crawlerTask	app.controllers.crawlerTask.index
 * GET	/api/crawler/task/new	new_post	app.controllers.crawlerTask.new
 * GET	/api/crawler/task/:id	post	app.controllers.crawlerTask.show
 * GET	/api/crawler/task/:id/edit	edit_post	app.controllers.crawlerTask.edit
 * POST	/api/crawler/task	crawlerTask	app.controllers.crawlerTask.create
 * PUT	/api/crawler/task/:id	post	app.controllers.crawlerTask.update
 * DELETE	/api/crawler/task/:id	post	app.controllers.crawlerTask.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 17:14:27
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerTaskController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.crawlerTask.index(query);
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
    const res = await service.crawlerTask.check(ctx.query);
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
    const res = await service.crawlerTask.create(ctx.request.body);
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
    const res = await service.crawlerTask.update(ctx.request.body);
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
    const res = await service.crawlerTask.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CrawlerTaskController;
