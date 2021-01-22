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

class SysFileService extends Service {

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
    const folder = stream.fields.folder || 'system';
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
    return result;
  }


  // update======================================================================================================>
  async updatePre(_id) {
    const { ctx } = this;
    const attachment = await ctx.service.sysUpload.findOne(_id);
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
    const attachment = await ctx.service.sysUpload.findOne(_id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return ctx.model.SysFile.findByIdAndUpdate(_id, values);
  }

  async update(_id, values) {
    const { ctx } = this;
    return ctx.model.SysFile.findByIdAndUpdate(_id, values);
  }

  // index======================================================================================================>
  async index(query) {
    const { ctx } = this;
    const { currentPage, pageSize, newName } = query;
    let result = [];
    if (pageSize) {
      const _offset = (currentPage - 1) * pageSize;
      result = await ctx.model.SysFile.findAndCountAll({
        where: {
          newName: {
            $like: `%${newName}%`,
          },
        },
        // offet去掉前多少个数据
        offset: _offset,
        // limit每页数据数量
        limit: pageSize,
        order: [[ 'createdAt', 'DESC' ]],
      });
    } else {
      result = await ctx.model.SysFile.findAll();
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
    //       res = await ctx.model.SysFile.findOne({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //     } else {
    //       res = await ctx.model.SysFile.findOne({ filename: { $regex: search } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //     }
    //     totals = res.length;
    //   } else {
    //     if (kind) {
    //       res = await ctx.model.SysFile.findOne({ extname: { $in: attachmentKind[`${kind}`] } }).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //       totals = await ctx.model.SysFile.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
    //     } else {
    //       res = await ctx.model.SysFile.findOne({}).skip(skip).limit(Number(pageSize))
    //         .sort({ createdAt: -1 })
    //         .exec();
    //       totals = await ctx.model.SysFile.count({}).exec();
    //     }
    //   }
    // } else {
    //   if (search) {
    //     if (kind) {
    //       res = await ctx.model.SysFile.findOne({ filename: { $regex: search }, extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
    //     } else {
    //       res = await ctx.model.SysFile.findOne({ filename: { $regex: search } }).sort({ createdAt: -1 }).exec();
    //     }
    //     totals = res.length;
    //   } else {
    //     if (kind) {
    //       res = await ctx.model.SysFile.findOne({ extname: { $in: attachmentKind[`${kind}`] } }).sort({ createdAt: -1 }).exec();
    //       totals = await ctx.model.SysFile.count({ extname: { $in: attachmentKind[`${kind}`] } }).exec();
    //     } else {
    //       res = await ctx.model.SysFile.findAll();
    //       // res = await ctx.model.SysFile.findOne({}).sort({ createdAt: -1 }).exec();
    //       // totals = await ctx.model.SysFile.count({}).exec();
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
    const attachment = await ctx.model.SysFile.findByPk(id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      // 物理删除磁盘文件
      try {
        const target = path.join(this.config.baseDir, uplaodBasePath, attachment.folder, attachment.newName);
        // const folder = path.join(this.config.baseDir, uplaodBasePath, attachment.folder);
        // 文件存在则删除文件
        if (fs.existsSync(target)) {
          fs.unlinkSync(target);
        }
        // fs.readdir(folder, (err, files) => {
        //   if (err) {
        //     ctx.logger.error(new Error(err));
        //   }
        //   if (files.length === 0) {
        //     fs.rmdir(folder, err => {
        //       // if (err) {
        //       //   ctx.logger.error(new Error(err));
        //       // }
        //     });
        //   }
        // });
        // console.log(fs.readdirSync(folder));
        // if (fs.readdirSync(folder).length === 0) {
        //   fs.rmdir(folder);
        // }
        // 数据库删除文件
        const del_result = await ctx.model.SysFile.destroy({
          where: {
            id,
          },
        });
        return del_result;
      } catch (err) {
        // 处理错误
        ctx.throw(500, 'file delete err!!!');
      }
    }
  }

  // 查询单个附件
  async show(id) {
    const { ctx } = this;
    const attachment = await ctx.model.SysFile.findByPk(id);
    const target = path.join(this.config.baseDir, uplaodBasePath, attachment.folder, attachment.newName);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    }
    return target;
  }

  // 通过id下载单个文件
  async down(id) {
    const { ctx } = this;
    const attachment = await ctx.model.SysFile.findByPk(id);
    if (!attachment) {
      ctx.throw(404, 'attachment not found');
    } else {
      const target = path.join(this.config.baseDir, uplaodBasePath, attachment.folder, attachment.newName);
      return { target, attachment };
    }
  }
}

module.exports = SysFileService;
