/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.powMenu.index
 * GET	/menu/new	new_post	app.controllers.powMenu.new
 * GET	/menu/:id	post	app.controllers.powMenu.show
 * GET	/menu/:id/edit	edit_post	app.controllers.powMenu.edit
 * POST	/menu	menu	app.controllers.powMenu.create
 * PUT	/menu/:id	post	app.controllers.powMenu.update
 * DELETE	/menu/:id	post	app.controllers.powMenu.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2021-01-18 12:44:28
 */
'use strict';

const Controller = require('egg').Controller;

class PowMenuController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      parentId: ctx.helper.parseInt(ctx.query.parentId),
    };
    const res = await service.powMenu.index(query);
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
      type: ctx.query.type.split(','),
    };
    console.log(ctx.query);
    console.log(ctx.query.type);
    const res = await service.powMenu.tree(query);
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
    const res = await service.powMenu.create(ctx.request.body);
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
    const res = await service.powMenu.update(ctx.request.body);
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
    const res = await service.powMenu.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = PowMenuController;
