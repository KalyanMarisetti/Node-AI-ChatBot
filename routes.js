const router = require('express').Router();
const UserRoutes = require('./modules/users/User.routes')

/**
 * @module UserRoutes
 * @param {callback} routerObject handle all the methods in router object
 */
router.use('/users', UserRoutes);

module.exports = router;