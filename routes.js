const router = require('express').Router();
const UserRoutes = require('./modules/users/User.routes')
const ChatRoutes = require('./modules/chats/Chat.routes')

/**
 * @module UserRoutes
 * @param {callback} routerObject handle all the methods in router object
 */
router.use('/users', UserRoutes);

/**
 * @module ChatRoutes
 * @param {callback} routerObject handle all the methods in router object
 */
router.use('/chats', ChatRoutes);

module.exports = router;