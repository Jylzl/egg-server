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
    console.log(stream.filename);
    // 所有表单字段都能通过 `stream.fields` 获取到
    const filename = path.basename(stream.filename); // 文件名称
    const _extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
    const _size = stream._readableState.length; // 文件大小,字节
    const _mimeType = stream.mimeType; // 文件类型
    // 生成文件名
    const file = Date.now() + '' + Number.parseInt(Math.random() * 10000) + _extname;
    // 生成文件夹(YYYY-MM)
    const dirName = moment(Date.now()).format('YYYYMM');
    // 判断目录文件夹是否存在,不存在就创建
    if (!fs.existsSync(uplaodBasePath + dirName)) fs.mkdirSync(path.join(baseDir, uplaodBasePath, dirName));
    // 创建文件
    const target = path.join(baseDir, uplaodBasePath, dirName, file);
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
    return ctx.model.SysUpload.create({
      name: filename,
      extname: _extname,
      mime_type: _mimeType,
      size: _size,
      url: `/public/uploads/${dirName}/${file}`,
    });
  }


  // update======================================================================================================>
  async updatePre(_id) {
    const { ctx } = this;
    const attachment = await ctx.service.Upload.findOne(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      const target = path.join(this.config.baseDir, uplaodBasePath, `${attachment.url}`);
      fs.unlinkSync(target);
    }
    return attachment;
  }

  async extra(_id, values) {
    const { ctx } = this;
    const attachment = await ctx.service.Upload.findOne(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return ctx.model.SysUpload.findByIdAndUpdate(_id, values);
  }

  async update(_id, values) {
    const { ctx } = this;
    return ctx.model.SysUpload.findByIdAndUpdate(_id, values);
  }

  // index======================================================================================================>
  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysUpload.findAndCountAll({
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
      });
    } else {
      result = await ctx.model.SysUpload.findAll();
    }
    return result;

    // 支持全部all 无需传入kind
    // 图像kind = image ['.jpg', '.jpeg', '.png', '.gif']
    // 文档kind = document ['.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.key', '.numbers', '.pages', '.pdf', '.txt', '.psd', '.zip', '.gz', '.tgz', '.gzip' ]
    // 视频kind = video ['.mov', '.mp4', '.avi']
    // 音频kind = audio ['.mp3', '.wma', '.wav', '.ogg', '.ape', '.acc']

    // const attachmentKind = {
    //   image: [ '.jpg', '.jpeg', '.png', '.gif' ],
    //   document: [ '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.key', '.numbers', '.pages', '.pdf', '.txt', '.psd', '.zip', '.gz', '.tgz', '.gzip' ],
    //   video: [ '.mov', '.mp4', '.avi' ],
    //   audio: [ '.mp3', '.wma', '.wav', '.ogg', '.ape', '.acc' ],
    // };

    // const { currentPage, pageSize, isPaging, search, kind } = query;
    // let res = [];
    // let totals = 0;
    // const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    // if (isPaging) {
    //   if (search) {
    //     if (kind) {
    //       res = await ctx.model.SysUpload.findOne({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //     } else {
    //       res = await ctx.model.SysUpload.findOne({ filename: { $regex: search } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //     }
    //     totals = res.length;
    //   } else {
    //     if (kind) {
    //       res = await ctx.model.SysUpload.findOne({ extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //       totals = await ctx.model.SysUpload.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
    //     } else {
    //       res = await ctx.model.SysUpload.findOne({}).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //       totals = await ctx.model.SysUpload.count({}).exec();
    //     }
    //   }
    // } else {
    //   if (search) {
    //     if (kind) {
    //       res = await ctx.model.SysUpload.findOne({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
    //     } else {
    //       res = await ctx.model.SysUpload.findOne({ filename: { $regex: search } }).sort({ createdAt: -1 }).exec();
    //     }
    //     totals = res.length;
    //   } else {
    //     if (kind) {
    //       res = await ctx.model.SysUpload.findOne({ extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
    //       totals = await ctx.model.SysUpload.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
    //     } else {
    //       console.log(ctx.model.SysUpload);
    //       res = await ctx.model.SysUpload.findAll();
    //       // res = await ctx.model.SysUpload.findOne({}).sort({ createdAt: -1 }).exec();
    //       // totals = await ctx.model.SysUpload.count({}).exec();
    //     }
    //   }
    // }
    // // 整理数据源 -> Ant Design Pro
    // const data = res.map((e, i) => {
    //   const jsonObject = Object.assign({}, e._doc);
    //   jsonObject.key = i;
    //   jsonObject.createdAt = ctx.helper.formatTime(e.createdAt);
    //   return jsonObject;
    // });

    // return { count: totals, list: data, pageSize: Number(pageSize || 0), currentPage: Number(currentPage || 0) };
  }

  // 删除单个资源
  async destroy(id) {
    const { ctx } = this;
    const attachment = await ctx.service.upload.findOne(id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      // 物理删除磁盘文件
      const target = path.join(this.config.baseDir, uplaodBasePath, attachment.url);
      fs.unlinkSync(target);
    }
    // 数据库删除文件
    return ctx.model.SysUpload.findByIdAndRemove(id);
  }

  // 查询单个附件
  async show(id) {
    const { ctx } = this;
    const attachment = await ctx.model.SysUpload.findByPk(id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return attachment;
  }
}

module.exports = SysUploadService;
