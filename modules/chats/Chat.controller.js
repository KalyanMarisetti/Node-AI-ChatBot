const HTTP_STATUS = require('../../constants/http-status/HTTP.constants');
const Base = require('../../config/Base');
const CustomError = require('../../error-handlers/Custom.error');
const { COLLECTION_STATUS } = require('../../constants/collection-status/CollectionStatus.constants');
const { UserModel } = require('../users/User.model');
const USER_CONSTANT = require('../users/User.constant');

/**
 * @author Kalyan Marisetti <kalyanmarisetti98@gmail.com>
 * @class module:ChatsController
 * @extends Base class for pre-defined methods
 * @classdesc Handles requests to perform operations on chats
 */
class ChatsController extends Base {
    constructor() {
        super();
    }

    async saveChat(req, res) {
        try {
            this.logger.info('Inside ChatsController: saveChat method');

            // finding the user is existant
            const isUserExist = await UserModel.findById(req.user._id);
            if (!isUserExist) throw new CustomError('User not registered.', HTTP_STATUS.UNAUTHORIZED);

            return res.status(HTTP_STATUS.CREATED).json({ chats: [] });

        } catch (error) {
            this.logger.error(`Inside ChatsController: saveChat method: Error occured while saving chat ${error}`);
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

}

module.exports = new ChatsController();
