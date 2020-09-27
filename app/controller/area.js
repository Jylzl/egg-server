/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.area.index
 * GET	/menu/new	new_post	app.controllers.area.new
 * GET	/menu/:id	post	app.controllers.area.show
 * GET	/menu/:id/edit	edit_post	app.controllers.area.edit
 * POST	/menu	menu	app.controllers.area.create
 * PUT	/menu/:id	post	app.controllers.area.update
 * DELETE	/menu/:id	post	app.controllers.area.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-09-28 00:24:32
 */
'use strict';

const Controller = require('egg').Controller;

class AreaController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      parent_id: ctx.helper.parseInt(ctx.query.parent_id),
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.area.index(query);
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
      parent_id: ctx.helper.parseInt(ctx.query.parent_id),
      lazy: ctx.query.lazy,
    };
    const res = await service.area.tree(query);
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
    const res = await service.area.create(ctx.request.body);
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
    const res = await service.area.update(ctx.request.body);
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
    const res = await service.area.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AreaController;
