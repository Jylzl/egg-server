/**
 * @description: 菜单
 * GET	/menus	menus	app.controllers.menus.index
 * GET	/menus/new	new_post	app.controllers.menus.new
 * GET	/menus/:id	post	app.controllers.menus.show
 * GET	/menus/:id/edit	edit_post	app.controllers.menus.edit
 * POST	/menus	menus	app.controllers.menus.create
 * PUT	/menus/:id	post	app.controllers.menus.update
 * DELETE	/menus/:id	post	app.controllers.menus.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-11 09:31:42
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
