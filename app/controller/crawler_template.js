/**
 * @description: 采集任务
 * GET	/api/crawler/template	crawlerTemplate	app.controllers.crawlerTemplate.index
 * GET	/api/crawler/template/new	new_post	app.controllers.crawlerTemplate.new
 * GET	/api/crawler/template/:id	post	app.controllers.crawlerTemplate.show
 * GET	/api/crawler/template/:id/edit	edit_post	app.controllers.crawlerTemplate.edit
 * POST	/api/crawler/template	crawlerTemplate	app.controllers.crawlerTemplate.create
 * PUT	/api/crawler/template/:id	post	app.controllers.crawlerTemplate.update
 * DELETE	/api/crawler/template/:id	post	app.controllers.crawlerTemplate.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-19 09:42:02
 */
'use strict';

const Controller = require('egg').Controller;

class CrawlerTemplateController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.crawlerTemplate.index(query);
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
    const res = await service.crawlerTemplate.create(ctx.request.body);
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
    const res = await service.crawlerTemplate.update(ctx.request.body);
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
    const res = await service.crawlerTemplate.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CrawlerTemplateController;
