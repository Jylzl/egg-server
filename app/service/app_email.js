/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-28 18:13:37
 */
'use strict';
const nodemailer = require('nodemailer');

const Service = require('egg').Service;

class PowAreaService extends Service {

  // eslint-disable-next-line no-unused-vars
  async create(params) {
    // const { ctx } = this;
    // const result = await ctx.model.PowArea.create(params);
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // console.log(params);
    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '94648929@qq.com', // generated ethereal user
        pass: 'etlljrfmgoplbhfj', // generated ethereal password
      },
      // auth: {
      //   user: testAccount.user, // generated ethereal user
      //   pass: testAccount.pass, // generated ethereal password
      // },
    });

    // send mail with defined transport object
    const emailContent = {
      from: '"Fred Foo 👻" <94648929@qq.com>', // sender address
      to: params.to.join(','), // list of receivers
      cc: params.cc.join(','), // list of receivers
      bcc: params.bcc.join(','), // list of receivers
      subject: params.subject || '', // Subject line
      text: params.text || '', // plain text body
      html: params.html || '', // html body
    };
    if (params.attachments.path !== undefined && params.attachments.path.length > 0) {
      emailContent.attachments = params.attachments;
    }
    const info = await transporter.sendMail(emailContent);

    // console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return info;
  }
}

module.exports = PowAreaService;
