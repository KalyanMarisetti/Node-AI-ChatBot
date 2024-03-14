/**
 * @constant router express router method to handle routes efficiently
 */
const router = require('express').Router();
const AuthMiddleware = require('../../config/AuthMiddleware');
const ChatController = require('./Chat.controller');

/**
 * Add new Chat
 */
router.post('/add',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => ChatController.saveChat(req, res));


module.exports = router;