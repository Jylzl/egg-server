/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 17:03:25
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 17:37:59
 */
'use strict';

const Controller = require('egg').Controller;

class SysUploadController extends Controller {

  // 单文件上传
  async create() {
    const {
      ctx,
      service,
    } = this;
    /**
     * 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
     * 只支持上传一个文件。
     * 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields
     */
    const stream = await ctx.getFileStream();
    const res = await service.sysUpload.create(stream);
    // 设置响应内容和响应状态码
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = SysUploadController;
