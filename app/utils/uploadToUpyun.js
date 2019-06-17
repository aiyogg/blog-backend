const request = require('request');
const config = require('../config/config');
const fs = require('fs');

module.exports = {
  uploadToUpyun (fileName, { path: fileTmpPath, type }) {
    return new Promise((resolve, reject) => {
      var bucketUrl = config.upyunBucketPath;
      var visitUrl = config.upyunVisitUrl;
      var operator = config.upyunOperator;
      var pwd = config.upyunPwd;
      var method = 'PUT';
      var auth = Buffer.from(`${operator}:${pwd}`, 'utf8').toString('base64');

      var options = {
        url: bucketUrl + fileName,
        method: method,
        headers: {
          'Authorization': `Basic ${auth}`,
          'content-type': type
        },
        encoding: null,
        body: fs.createReadStream(fileTmpPath)
      }
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
        }
        if (response.statusCode === 200) {
          resolve(`${visitUrl}${fileName}`);
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
