const request = require('request');
const config = require('../config/config');
const fs = require('fs');

module.exports = {
  /**
   * 以我的身份，发布一条新微博
   * @param {String} articleUrl 文章链接
   * @param {String} status 微博正文
   * @param {*} pic 题图链接
   * @param {*} visible 微博可见性
   */
  wbPostNewMsg (articleUrl = 'https://blog.chenteng.me', status, visible = 0) {
    let option = {
      url: 'https://api.weibo.com/2/statuses/share.json',
      method: 'POST',
      // encoding: null,
      form: {
        access_token: config.wbMyToken,
        status: `${status} ${articleUrl}`,
        visible: visible
      }
    }
    return new Promise((resolve, reject) => {
      request(option, (error, response, body) => {
        if (error) {
          reject(error);
          console.log(error.message);
          return;
        }
        if (response.statusCode === 200) {
          resolve();
          console.log('成功发布一条微博');
        } else {
          reject(new Error(`Api wbShortenUrl called failed`));
          console.log(`微博 api 调用异常，状态码：${response.statusCode}`);
        }
      });
    });
  },
  wbShortenUrl (longUrl) {
    let option = {
      url: 'https://api.weibo.com/2/statuses/share.json',
      method: 'POST',
      form: {
        access_token: config.wbMyToken,
        url_long: longUrl
      }
    }
    return new Promise((resolve, reject) => {
      request(option, (error, response, body) => {
        if (error) {
          reject(error);
        }
        if (response.statusCode === 200 && body.urls.length) {
          resolve(body.urls[0].url_short);
        } else {
          reject(new Error(`Api wbShortenUrl called failed`));
        }
      });
    });
  }
}
