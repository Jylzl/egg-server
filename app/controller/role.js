/**
 * @description: 角色
 * GET	/role	role	app.controllers.role.index
 * GET	/role/new	new_post	app.controllers.role.new
 * GET	/role/:id	post	app.controllers.role.show
 * GET	/role/:id/edit	edit_post	app.controllers.role.edit
 * POST	/role	role	app.controllers.role.create
 * PUT	/role/:id	post	app.controllers.role.update
 * DELETE	/role/:id	post	app.controllers.role.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-08-12 10:46:59
 */
'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
    };
    const res = await service.role.index(query);
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
    const res = await service.role.create(ctx.request.body);
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
    const res = await service.role.update(ctx.request.body);
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
    const res = await service.role.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = RoleController;
