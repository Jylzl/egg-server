/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-12-19 11:56:05
 * @LastAuthor: lizlong
 * @lastTime: 2019-12-19 12:00:33
 */
'use strict';

// app/extend/helper.js
module.exports = {
  parseInt(string) {
    if (typeof string === 'number') return string;
    if (!string) return string;
    return parseInt(string) || 0;
  },
};
