const crypto = require('crypto');
const request = require('request');
const config = require('../config/config');

module.exports = {
  uploadToUpyun(fileName) {
    return new Promise((resolve, reject) => {
      var bucketUrl = config.upyunBucketPath;
      var operator = config.upyunOperator;
      var pwd = config.upyunPwd;
      var dateStr = new Date().toUTCString();
      var requestUri = '/fedt-blog/' + fileName;
      var method = 'PUT';

      var pwdMD5 = crypto.createHash('md5').update(pwd).digest('hex');
      var params = `${method}&${decodeURI(requestUri)}&${dateStr}`
      var signature = crypto.createHmac('sha1', pwdMD5).update(params).digest();
      var signStr = Buffer.from(signature).toString('base64');

      var options = {
        url: bucketUrl + fileName,
        methods: method,
        headers: {
          'Authorization': `UPYUN ${operator}:${signStr}`,
          'Date': dateStr
        }
      }
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        if (response.statusCode === 200) {
          resolve(`${config.upyunBucketPath}fileName`);
        } else {
          let error = null;
          try {
            error = JSON.parse(body);
          } catch (err) {
            console.log(err);
            reject(err);
          }
          reject(error);
        }
      });
    });
  }
}
