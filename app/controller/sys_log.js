/**
 * @description: 密钥
 * GET	/log	log	app.controllers.sysLog.index
 * GET	/log/new	new_post	app.controllers.sysLog.new
 * GET	/log/:id	post	app.controllers.sysLog.show
 * GET	/log/:id/edit	edit_post	app.controllers.sysLog.edit
 * POST	/log	log	app.controllers.sysLog.create
 * PUT	/log/:id	post	app.controllers.sysLog.update
 * DELETE	/log/:id	post	app.controllers.sysLog.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-05 14:58:49
 */
'use strict';

const Controller = require('egg').Controller;

class SecretkeyController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
      title: ctx.query.title,
    };
    const res = await service.sysLog.index(query);
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
    const res = await service.sysLog.create(ctx.request.body);
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
    const res = await service.sysLog.update(ctx.request.body);
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
    const res = await service.sysLog.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = SecretkeyController;
