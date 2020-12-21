/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.powDept.index
 * GET	/menu/new	new_post	app.controllers.powDept.new
 * GET	/menu/:id	post	app.controllers.powDept.show
 * GET	/menu/:id/edit	edit_post	app.controllers.powDept.edit
 * POST	/menu	menu	app.controllers.powDept.create
 * PUT	/menu/:id	post	app.controllers.powDept.update
 * DELETE	/menu/:id	post	app.controllers.powDept.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 12:57:50
 */
'use strict';

const Controller = require('egg').Controller;

class PowDeptController extends Controller {
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
    const res = await service.powDept.index(query);
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
    const res = await service.powDept.tree(query);
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
    const res = await service.powDept.create(ctx.request.body);
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
    const res = await service.powDept.update(ctx.request.body);
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
    const res = await service.powDept.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = PowDeptController;
