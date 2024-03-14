/**
 * @constant config config values
 */
const config = require('./config');

/**
* @constant jwt library to generate jwt token
*/
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../constants/http-status/HTTP.constants');
const Base = require('./Base');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @class Middleware methods of the application
 * @desc contains all the middleware methods of the application.
 * @returns middleware class
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class AuthMiddleware extends Base {
    constructor() {
        super();
    }

    /**
     * @module AuthMiddleware:authenticate
     * @method authenticate verifies jwt token
     * @description verifies jwt auth token, if error returns unauthorized message
     * @returns passes the middleware to the next method.
     */
    async authenticate(req, res, next) {
        try {
            this.logger.info('Inside AuthMiddleware: authenticate method');
            let tokenHeader = req.headers['authorization'];
            if (tokenHeader) {
                let token = await tokenHeader.split(' ');
                let decoded = jwt.verify(token[1], config.SERVER.JWT_SECRET);
                if (decoded) {
                    req.user = decoded;
                    return next();
                } else {
                    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, message: 'Session expired.' });
                }
            } else {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, message: 'Authentication token required' });
            }
        } catch (error) {
            this.logger.error('Inside AuthMiddleware: authenticate method:  Error occured while verifying JWT Token ', error);
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, message: 'Session expired.' });
        }
    }

}

module.exports = new AuthMiddleware();