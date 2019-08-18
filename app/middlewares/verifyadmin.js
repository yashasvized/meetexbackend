const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const request = require("request")
const User = mongoose.model('User')

const logger = require('./../libs/loggerLib')
const responseLib = require('./../libs/responseLib')
const token = require('./../libs/tokenLib')
const check = require('./../libs/checkLib')

let isAdmin = (req, res, next) => {
  

    User.findOne(req.body.adminId, (err, result) => {
      if (err) {
        console.log(err)
        logger.error(err.message, 'AuthorizationMiddleware', 10)
        let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(result)) {
        logger.error('No user present', 'verifyadmin', 10)
        let apiResponse = responseLib.generate(true, 'No user present', 404, null)
        res.send(apiResponse)
      }else if(result.isAdmin == 'false'){
        logger.error('You are not admin', 'verifyadmin', 10)
        let apiResponse = responseLib.generate(true, 'You are not admin', 405, null)
        res.send(apiResponse)
      }
       else {
                next();       
      }
    })
}


module.exports = {
  isAdmin: isAdmin
}
