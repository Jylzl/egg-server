/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-23 20:25:21
 */
'use strict';
const os = require('os');

const Service = require('egg').Service;

class SysInfSrvice extends Service {

  async getSysInf() {
    // const { ctx } = this;
    return {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      cpus: os.cpus(),
    };
  }
}

module.exports = SysInfSrvice;
