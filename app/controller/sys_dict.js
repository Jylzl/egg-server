/**
 * @description: 数据字典
 * GET	/dict	dict	app.controllers.sysDict.index
 * GET	/dict/new	new_post	app.controllers.sysDict.new
 * GET	/dict/:id	post	app.controllers.sysDict.show
 * GET	/dict/:id/edit	edit_post	app.controllers.sysDict.edit
 * POST	/dict	dict	app.controllers.sysDict.create
 * PUT	/dict/:id	post	app.controllers.sysDict.update
 * DELETE	/dict/:id	post	app.controllers.sysDict.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-21 16:04:30
 */
'use strict';

const Controller = require('egg').Controller;

class SysDictController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
      type: ctx.helper.parseInt(ctx.query.type),
    };
    const res = await service.sysDict.index(query);
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

  async create() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.sysDict.create(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async update() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.sysDict.update(ctx.request.body);
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
    const res = await service.sysDict.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async type() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.sysDict.type(ctx.params.type);
    ctx.helper.success({
      ctx,
      res: res.sys_dict_items,
    });
  }
}

module.exports = SysDictController;
