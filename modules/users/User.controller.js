const HTTP_STATUS = require('../../constants/http-status/HTTP.constants');
const UserService = require('./User.service');
const Base = require('../../config/Base');
const CustomError = require('../../error-handlers/Custom.error');
const { COLLECTION_STATUS } = require('../../constants/collection-status/CollectionStatus.constants');
const { UserModel } = require('./User.model');
const USER_CONSTANT = require('./User.constant');

/**
 * @author Kalyan Marisetti <kalyanmarisetti98@gmail.com>
 * @class module:usersController
 * @extends Base class for pre-defined methods
 * @classdesc Handles requests to perform operations on users
 */
class UsersController extends Base {
    constructor() {
        super();
    }

    /**
     * @method users:controller:saveUser
     * @description adds new user record to the db after successful validation
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @returns successful response when no error occured during save
     */
    async saveUser(req, res) {
        try {
            this.logger.info('Inside UserController: saveUser method');
            let response = await UserService.createUser(req.body);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);
            return res.status(HTTP_STATUS.CREATED).json(response);

        } catch (error) {
            this.logger.error(`Inside UserController: saveUser method: Error occured while saving user ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error,
                })
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error,
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            this.logger.info('Inside UserController: getAllUsers method');
            let users = await UserModel.find({ status: COLLECTION_STATUS.ACTIVE });
            if (!users) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);
            return res.status(HTTP_STATUS.OK).json({
                status: true,
                message: USER_CONSTANT.USERS_RETRIEVED_SUCCESSFUL,
                count: users.length,
                data: users,
            });
        } catch (error) {
            this.logger.error(`Inside UserController: getAllUsers method: Error occured while retriving users ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error,
                })
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error,
            });
        }
    }

    async loginUser(req, res) {
        try {
            this.logger.info('Inside UserController: loginUser method');

            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });
            if (!user) throw new CustomError('User not registered.', HTTP_STATUS.UNAUTHORIZED);
            const isPasswordCorrect = await this.validateHashData(password, user.password);
            if (!isPasswordCorrect) throw new CustomError('Entered wrong password', HTTP_STATUS.UNAUTHORIZED);
            return res.status(HTTP_STATUS.OK).json({ status: true, message: USER_CONSTANT.USER_LOGGED_SUCCESSFULLY });
        } catch (error) {
            this.logger.error(`Inside UserController: loginUser method: Error occured while logging in user ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error,
                })
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error,
            });
        }
    }

    // async logoutUser(req, res) {
    //     try {
    //         this.logger.info('Inside UserController: logoutUser method');

    //         const { email, password } = req.body;
    //         const user = await UserModel.findOne({ email });
    //         if (!user) throw new CustomError('User not registered.', HTTP_STATUS.UNAUTHORIZED);
    //         const isPasswordCorrect = await this.validateHashData(password, user.password);
    //         if (!isPasswordCorrect) throw new CustomError('Entered wrong password', HTTP_STATUS.UNAUTHORIZED);
    //         return res.status(HTTP_STATUS.OK).json({ status: true, message: USER_CONSTANT.USER_LOGGED_SUCCESSFULLY });
    //     } catch (error) {
    //         this.logger.error(`Inside UserController: logoutUser method: Error occured while logging out user ${error}`);
    //         if (error instanceof CustomError)
    //             return res.status(error.statusCode).json({
    //                 status: false,
    //                 message: error.message || this.error,
    //             })
    //         return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    //             status: false,
    //             message: this.error,
    //         });
    //     }
    // }

}

module.exports = new UsersController();
