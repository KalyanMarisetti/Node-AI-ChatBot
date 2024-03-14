/**
 * @constant router express router method to handle routes efficiently
 */
const router = require('express').Router();
const AuthMiddleware = require('../../config/AuthMiddleware');
const UserController = require('./User.controller');

/**
 * Sign up new User
 */
router.post('/signup', (req, res) => UserController.saveUser(req, res));

/**
 * get all users
 */
router.get("/", (req, res) => UserController.getAllUsers(req, res));

/**
 * Login user
 */
router.post("/login",
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => UserController.loginUser(req, res));

/**
* Logout user
*/
router.post("/logout",
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => UserController.logoutUser(req, res));


module.exports = router;