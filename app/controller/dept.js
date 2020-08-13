/**
 * @description: 菜单
 * GET	/menu	menu	app.controllers.dept.index
 * GET	/menu/new	new_post	app.controllers.dept.new
 * GET	/menu/:id	post	app.controllers.dept.show
 * GET	/menu/:id/edit	edit_post	app.controllers.dept.edit
 * POST	/menu	menu	app.controllers.dept.create
 * PUT	/menu/:id	post	app.controllers.dept.update
 * DELETE	/menu/:id	post	app.controllers.dept.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-13 09:24:24
 */
'use strict';

const Controller = require('egg').Controller;

class DeptController extends Controller {
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
    const res = await service.dept.index(query);
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
    const res = await service.dept.tree(query);
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
    const res = await service.dept.create(ctx.request.body);
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
    const res = await service.dept.update(ctx.request.body);
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
    const res = await service.dept.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = DeptController;
