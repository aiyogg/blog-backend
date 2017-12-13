let express = require('express');
let router = express.Router();
let request = require('request');
let config = require('../config/config');

router.get('/wb', getCode);

function getCode(req, res, next) {
  let option = {
    url: 'https://api.weibo.com/oauth2/access_token',
    method: 'POST',
    form: {
      client_id: config.wbAppKey,
      client_secret: config.wbAppSecret,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: config.wbRedirectUrl
    }
  }
  request(option, (error, response, body) => {
    if (error) {
      console.log(error.message);
      res.send({
        err: error.message || 'unknow error'
      });
      return;
    }
    if (response.statusCode === 200) {
      console.log(body);
      res.send(body);
    } else {
      res.send({
        err: 'api called error'
      });
    }
  });
}

module.exports = router;
