'use strict';

const fs = require('fs');
const path = require('path');
const Service = require('egg').Service;

class UploadService extends Service {

  // 创建资源==destroy============================================================================================>
  async create(payload) {
    const { ctx } = this;
    return ctx.model.Upload.create(payload);
  }

  // 删除资源==destroy============================================================================================>
  async destroy(_id) {
    const { ctx } = this;
    const attachment = await ctx.service.upload.find(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      const target = path.join(this.config.baseDir, 'app/public/uploads/', `${attachment.url}`);
      fs.unlinkSync(target);
    }
    return ctx.model.Upload.findByIdAndRemove(_id);
  }

  // update======================================================================================================>
  async updatePre(_id) {
    const { ctx } = this;
    const attachment = await ctx.service.Upload.find(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      const target = path.join(this.config.baseDir, 'app/public/uploads/', `${attachment.url}`);
      fs.unlinkSync(target);
    }
    return attachment;
  }

  async extra(_id, values) {
    const { ctx } = this;
    const attachment = await ctx.service.Upload.find(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return ctx.model.Upload.findByIdAndUpdate(_id, values);
  }

  async update(_id, values) {
    const { ctx } = this;
    return ctx.model.Upload.findByIdAndUpdate(_id, values);
  }

  // show======================================================================================================>
  async show(_id) {
    const { ctx } = this;
    const attachment = await ctx.model.Upload.findByPk(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return attachment;
  }

  // index======================================================================================================>
  async index(payload) {
    const { ctx } = this;
    // 支持全部all 无需传入kind
    // 图像kind = image ['.jpg', '.jpeg', '.png', '.gif']
    // 文档kind = document ['.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.key', '.numbers', '.pages', '.pdf', '.txt', '.psd', '.zip', '.gz', '.tgz', '.gzip' ]
    // 视频kind = video ['.mov', '.mp4', '.avi']
    // 音频kind = audio ['.mp3', '.wma', '.wav', '.ogg', '.ape', '.acc']

    const attachmentKind = {
      image: [ '.jpg', '.jpeg', '.png', '.gif' ],
      document: [ '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.key', '.numbers', '.pages', '.pdf', '.txt', '.psd', '.zip', '.gz', '.tgz', '.gzip' ],
      video: [ '.mov', '.mp4', '.avi' ],
      audio: [ '.mp3', '.wma', '.wav', '.ogg', '.ape', '.acc' ],
    };

    const { currentPage, pageSize, isPaging, search, kind } = payload;
    let res = [];
    let totals = 0;
    const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    if (isPaging) {
      if (search) {
        if (kind) {
          res = await ctx.model.Upload.find({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
            .sort({ createdAt: -1 })
            .exec();
        } else {
          res = await ctx.model.Upload.find({ filename: { $regex: search } }).skip(skip).limit(Number(pageSize))
            .sort({ createdAt: -1 })
            .exec();
        }
        totals = res.length;
      } else {
        if (kind) {
          res = await ctx.model.Upload.find({ extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
            .sort({ createdAt: -1 })
            .exec();
          totals = await ctx.model.Upload.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
        } else {
          res = await ctx.model.Upload.find({}).skip(skip).limit(Number(pageSize))
            .sort({ createdAt: -1 })
            .exec();
          totals = await ctx.model.Upload.count({}).exec();
        }
      }
    } else {
      if (search) {
        if (kind) {
          res = await ctx.model.Upload.find({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
        } else {
          res = await ctx.model.Upload.find({ filename: { $regex: search } }).sort({ createdAt: -1 }).exec();
        }
        totals = res.length;
      } else {
        if (kind) {
          res = await ctx.model.Upload.find({ extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
          totals = await ctx.model.Upload.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
        } else {
          console.log(ctx.model.Upload);
          res = await ctx.model.Upload.find();
          // res = await ctx.model.Upload.find({}).sort({ createdAt: -1 }).exec();
          totals = await ctx.model.Upload.count({}).exec();
        }
      }
    }
    // 整理数据源 -> Ant Design Pro
    const data = res.map((e, i) => {
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.createdAt = ctx.helper.formatTime(e.createdAt);
      return jsonObject;
    });

    return { count: totals, list: data, pageSize: Number(pageSize), currentPage: Number(currentPage) };
  }

  // Commons======================================================================================================>
  async find(id) {
    const { ctx } = this;
    return ctx.model.Upload.findById(id);
  }
}

module.exports = UploadService;