/**
 * @description: 邮件
 * GET	/email	email	app.controllers.appEmail.index
 * GET	/email/new	new_post	app.controllers.appEmail.new
 * GET	/email/:id	post	app.controllers.appEmail.show
 * GET	/email/:id/edit	edit_post	app.controllers.appEmail.edit
 * POST	/email	email	app.controllers.appEmail.create
 * PUT	/email/:id	post	app.controllers.appEmail.update
 * DELETE	/email/:id	post	app.controllers.appEmail.destroy
 * @author: lizlong<94648929@qq.com>
 * @since: Do not edit
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-28 16:33:13
 */
'use strict';

const Controller = require('egg').Controller;

class AppEmailController extends Controller {
  async create() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.appEmail.create(ctx.request.body);
    ctx.helper.success({
      ctx,
      res,
    });
  }

}

module.exports = AppEmailController;
