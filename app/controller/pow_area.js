/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.powArea.index
 * GET	/menu/new	new_post	app.controllers.powArea.new
 * GET	/menu/:id	post	app.controllers.powArea.show
 * GET	/menu/:id/edit	edit_post	app.controllers.powArea.edit
 * POST	/menu	menu	app.controllers.powArea.create
 * PUT	/menu/:id	post	app.controllers.powArea.update
 * DELETE	/menu/:id	post	app.controllers.powArea.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:47:09
 */
'use strict';

const Controller = require('egg').Controller;

class PowAreaController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      parentId: ctx.helper.parseInt(ctx.query.parentId),
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.powArea.index(query);
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

  async tree() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      parentId: ctx.helper.parseInt(ctx.query.parentId),
      lazy: ctx.query.lazy,
    };
    const res = await service.powArea.tree(query);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async create() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.powArea.create(ctx.request.body);
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
    const res = await service.powArea.update(ctx.request.body);
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
    const res = await service.powArea.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = PowAreaController;
