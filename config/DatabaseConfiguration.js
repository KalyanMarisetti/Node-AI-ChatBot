/**
 * @constant mongoose object relation mapper - orm for database
 */
const mongoose = require('mongoose');

/**
 * @constant Base all the Base methods logger,...
 */
const Base = require('./Base');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @class DatabaseConfiguration
 * @description connects the application to the database
 * @requires config:config to pass database configuration
 * @returns {void} simply connects the application to database
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class DatabaseConfiguration extends Base {
    constructor() {
        super();
    }
    /**
     * @method initialize_db static method to access without the instance of class
     * @param {*} config environment variable configuration for db
     */
    async connect(config) {
        try {
            await mongoose.connect(config.BASE_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            console.info('***************************************************************');
            console.info('\t\tDATABASE CONNECTION SUCCESSFULL');
            console.info('***************************************************************');
        } catch (error) {
            console.error(error.message);
        }
    };
}

module.exports = new DatabaseConfiguration();
