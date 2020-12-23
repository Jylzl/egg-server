/**
 * @description: 密钥
 * GET	/secretkey	secretkey	app.controllers.sysSecretkey.index
 * GET	/secretkey/new	new_post	app.controllers.sysSecretkey.new
 * GET	/secretkey/:id	post	app.controllers.sysSecretkey.show
 * GET	/secretkey/:id/edit	edit_post	app.controllers.sysSecretkey.edit
 * POST	/secretkey	secretkey	app.controllers.sysSecretkey.create
 * PUT	/secretkey/:id	post	app.controllers.sysSecretkey.update
 * DELETE	/secretkey/:id	post	app.controllers.sysSecretkey.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 15:58:44
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
    };
    const res = await service.sysSecretkey.index(query);
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
    const res = await service.sysSecretkey.create(ctx.request.body);
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
    const res = await service.sysSecretkey.update(ctx.request.body);
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
    const res = await service.sysSecretkey.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = SecretkeyController;
