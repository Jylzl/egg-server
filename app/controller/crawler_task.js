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
 * @lastTime: 2021-01-23 17:15:36
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
      columnId: ctx.helper.parseInt(ctx.query.columnId),
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

  // 采集进度
  async progress() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerTask.progress(ctx.query);
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
    const res = await service.crawlerTask.collect(ctx.query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 清空任务
  async clear() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.crawlerTask.clear(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CrawlerTaskController;
