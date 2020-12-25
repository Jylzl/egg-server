/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2020-12-25 17:06:16
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-25 17:44:46
 */
'use strict';

const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
// const download = require('image-downloader');
const moment = require('moment');
moment().format();

// 上传基础目录
const uplaodBasePath = 'app/public/uploads/';

class SysUploadService extends Service {

  // 上传文件(单文件)
  async create(stream) {
    const { ctx } = this;
    // 项目路径
    const baseDir = this.config.baseDir;
    // 所有表单字段都能通过 `stream.fields` 获取到
    const name = path.basename(stream.filename); // 文件名称
    const extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
    const size = stream._readableState.length; // 文件大小,字节
    const mime_type = stream.mimeType; // 文件类型
    // 生成文件名(默认system)
    const new_name = Date.now() + '' + Number.parseInt(Math.random() * 10000) + extname;
    // 生成文件夹(YYYY-MM)
    // const folder = moment(Date.now()).format('YYYYMM');
    const folder = stream.fields.folder || 'default';
    // 判断目录文件夹是否存在,不存在就创建
    if (!fs.existsSync(uplaodBasePath + folder)) fs.mkdirSync(path.join(baseDir, uplaodBasePath, folder));
    // 创建文件
    const target = path.join(baseDir, uplaodBasePath, folder, new_name);
    const writeStream = fs.createWriteStream(target);
    // 文件处理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    // 插入数据库
    const result = ctx.model.SysFile.create({
      folder,
      name,
      new_name,
      extname,
      mime_type,
      size,
    });
    if (!result) {
      ctx.throw(500, 'upload err!!!');
    } else {
      return {
        folder,
        name,
        new_name,
        extname,
        mime_type,
        size,
        url: `/public/uploads/${folder}/${new_name}`,
      };
    }
  }
}

module.exports = SysUploadService;
