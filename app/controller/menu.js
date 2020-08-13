/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.menu.index
 * GET	/menu/new	new_post	app.controllers.menu.new
 * GET	/menu/:id	post	app.controllers.menu.show
 * GET	/menu/:id/edit	edit_post	app.controllers.menu.edit
 * POST	/menu	menu	app.controllers.menu.create
 * PUT	/menu/:id	post	app.controllers.menu.update
 * DELETE	/menu/:id	post	app.controllers.menu.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 09:52:51
 */
'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      parent_id: ctx.helper.parseInt(ctx.query.parent_id),
    };
    const res = await service.menu.index(query);
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
    const res = await service.menu.tree(query);
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
    const res = await service.menu.create(ctx.request.body);
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
    const res = await service.menu.update(ctx.request.body);
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
    const res = await service.menu.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = MenuController;
