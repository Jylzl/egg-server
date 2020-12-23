/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-10 22:50:01
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 20:09:23
 */
'use strict';

const Controller = require('egg').Controller;

class SysInfController extends Controller {
  async getSysInf() {
    const { ctx, service } = this;
    const res = await service.sysInf.getSysInf();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = SysInfController;
