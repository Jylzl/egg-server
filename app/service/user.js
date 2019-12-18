'use strict';

// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.app.mysql.get('user', { id: uid });
    return user;
  }
}

module.exports = UserService;
