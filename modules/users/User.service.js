const config = require('../../config/config');
const { UserModel } = require('./User.model');
const USER_CONSTANTS = require('./User.constant');
const Base = require('../../config/Base');
const CustomError = require('../../error-handlers/Custom.error');
const HTTP_STATUS = require('../../constants/http-status/HTTP.constants');
const USER_CONSTANT = require('./User.constant');


/**
 * @author: Kalyan Marisetti <kalyanmarisetti98@gmail.com>
 * @class module:UserService
 * @extends Base class for pre-defined methods
 * @classdesc Handles requests to perform operations on users
 */
class UserService extends Base {
    constructor() {
        super();
    }

    /**
   * @method users:createUser
   * @description adds new user record to the db after successful validation
   * @returns successful response when no error occured during creating new user account
   */
    async createUser(userRQ) {
        try {
            this.logger.info('Inside UserService: createUser method.');
            if (!userRQ.name || !userRQ.email) throw new CustomError('Please provide user details.', HTTP_STATUS.BAD_REQUEST);

            // finding the user is existant
            const isUserExist = await UserModel.findOne({ email: userRQ.email });
            if (isUserExist) throw new CustomError(USER_CONSTANTS.USER_ALREADY_EXISTENT, HTTP_STATUS.DUPLICATE);

            const hashedPassword = await this.hashData(userRQ.password);
            let userPayload = {
                name: userRQ.name,
                email: userRQ.email,
                password: hashedPassword,
            }
            let userData = new UserModel(userPayload);
            let saveUser = await userData.save();
            let tokenDetails = {
                name: saveUser.name,
                email: saveUser.email,
                _id: saveUser._id,
            }
            let authToken = await this.jwt(tokenDetails);
            return {
                status: true,
                message: USER_CONSTANT.SAVE_USER,
                authToken
            };
        } catch (error) {
            this.logger.error(`Error while creating new user account: ${error.message}`);
            throw new CustomError(error instanceof CustomError ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new UserService();
