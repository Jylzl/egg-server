/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-20 08:43:13
 * @LastAuthor: lizlong
 * @lastTime: 2020-12-24 11:47:01
 */
'use strict';
const os = require('os');
const si = require('systeminformation');

const Service = require('egg').Service;

class SysInfSrvice extends Service {

  async getSysInf() {
    // const { ctx } = this;
    const cpu = await new Promise((resolve, reject) => {
      si.cpu()
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
    const mem = await new Promise((resolve, reject) => {
      si.mem()
        .then(data => resolve(data))
        .catch(error => reject(error));
    });

    return {
      hostname: os.hostname(),
      type: os.type(),
      platform: os.platform(),
      arch: os.arch(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
      cpu,
      mem,
    };
  }
}

module.exports = SysInfSrvice;
