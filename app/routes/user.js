const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const friendController = require("./../../app/controllers/friendController");
const todolistController = require("./../../app/controllers/todolistController");
const friendactions = require("./../../app/controllers/friendActionController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const verifyadmin = require('./../middlewares/verifyadmin')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/users`;

    app.get("/confirmation/:token",userController.updatePassword)


     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/update api for user password reset.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "password reset sent",
            "status": 200,
            "data": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8",
                "password":"encrypted"

        }
    */

   app.post(`${baseUrl}/confirmation`,userController.forgetPassword)



 /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/update/:token api for updating password.
     *    
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
             password updated
         }
    */
   app.get(`${baseUrl}/updatepassword`,userController.updatePassword)

   
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/allusers api for geting all users.
     *      
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
      {
        "error": false,
            "message": "all user found",
            "status": 200,
     
      [
         {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "meeting":[],
                "userId": "-E9zxTYA8",

        },
          {
                "mobileNumber": 333435524,
                "email": "someone@mail.com",
                "lastName": "yash",
                "firstName": "Rishabh",
                "meeting":[],
                "userId": "-E9zxTYA8",

        }
    ]
}
    */

   app.get(`${baseUrl}/allusers`, userController.getAllUser);

    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {number} mobileNumber mobileNumber of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Signup Successful",
            "status": 200,
            "data": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "meeting":[],
                "userId": "-E9zxTYA8",
                "password":"encrypted"

        }
    */
    app.post(`${baseUrl}/signup`, userController.signUpFunction);


      /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/deleteplans api for user deleting meeting.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} adminemail adminemai of the admin. (body params) (required)
     * @apiParam {string} userId userId of the admin. (body params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} meetId meetId of the meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                n:1,
                nmodified:1,
                nok:1
            }

        }
    */


   app.post(`${baseUrl}/deleteplans`,verifyadmin.isAdmin, userController.deleteAMeeting);


   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/meetingplans api for getting meeting of current user.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {[
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "meeting":[],
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            ]}

        }
    */


   app.post(`${baseUrl}/meetingplans`, userController.getCurrentUser);


    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/meeting api for user adding or updating meeting.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} adminemail adminemai of the admin. (body params) (required)
     * @apiParam {string} userId userId of the admin. (body params) (required)
     * @apiParam {string} userId userId of the user. (body params) (required)
     * @apiParam {string} title title of the meeting. (body params) (required)
     * @apiParam {string} description description of the meeting. (body params) (required)
     * @apiParam {string} starttime starttime of the meeting. (body params) (required)
     * @apiParam {string} endtime endtime of the meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                n:1,
                nmodified:1,
                nok:1
            }

        }
    */

   app.post(`${baseUrl}/meeting`,verifyadmin.isAdmin, userController.addAMeeting);



   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "lastName": "Sengar",
                "firstName": "Rishabh",
                "userId": "-E9zxTYA8"
            }

        }
    */

    app.post(`${baseUrl}/login`, userController.loginFunction);


   // app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

}
