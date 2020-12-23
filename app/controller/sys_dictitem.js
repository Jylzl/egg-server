/**
 * @description: 数据字典项
 * GET	/dictitem	dictitem	app.controllers.sysDictitem.index
 * GET	/dictitem/new	new_post	app.controllers.sysDictitem.new
 * GET	/dictitem/:id	post	app.controllers.sysDictitem.show
 * GET	/dictitem/:id/edit	edit_post	app.controllers.sysDictitem.edit
 * POST	/dictitem	dictitem	app.controllers.sysDictitem.create
 * PUT	/dictitem/:id	post	app.controllers.sysDictitem.update
 * DELETE	/dictitem/:id	post	app.controllers.sysDictitem.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 09:46:06
 */
'use strict';

const Controller = require('egg').Controller;

class SysDictItemController extends Controller {
  async index() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      currentPage: ctx.helper.parseInt(ctx.query.currentPage),
      pageSize: ctx.helper.parseInt(ctx.query.pageSize),
      dictId: ctx.helper.parseInt(ctx.query.dictId),
    };
    const res = await service.sysDictitem.index(query);
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
    const res = await service.sysDictitem.create(ctx.request.body);
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
    const res = await service.sysDictitem.update(ctx.request.body);
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
    const res = await service.sysDictitem.destroy(ctx.params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async check() {
    const {
      ctx,
      service,
    } = this;
    const query = {
      dict_id: ctx.query.dict_id,
      value: ctx.query.value,
    };
    const res = await service.sysDictitem.check(query);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = SysDictItemController;
