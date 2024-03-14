/**
 * @constant createLogger method to initiate logger and take input configuration
 */
const { createLogger, format, transports } = require('winston');
const config = require('./config');
const path = require('path');

/**
 * @constant combine chains all the configurations
 * @constant json logs the error in the json format
 * @constant timestamp method accepts config object in format YYYY:MM:DD
 * @constant error allows the logger to log internal server errors
 */
const { combine, timestamp, json, printf, errors } = format;

/**
 * @constant myFormat combining all the imports to our own custom redable format
 */
const customFormat = printf(({ level, message, timestamp, stack }) => {
	return `${timestamp}  ${level}: ${stack || message}`;
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @class Hadles the logging mechanism in application
 * @desc contains all the default methods of logging in the application.
 * @returns
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Logger {
	constructor() {
		this.error = 'Internal Server Error! Please Try Again.';
		this.logger = this.logger();
	}

	/**
	* @method logger static method to access without class initialize
	* @returns looger method with different verbose levele
	*/
	logger() {
		const logger = createLogger({
			format: combine(timestamp(), errors({ stack: true }), customFormat, json()),
			defaultMeta: { meta: '' },
			transports: [
				new transports.Console(),
				new transports.File({
					level: 'error',
					filename: config.LOGGER.ERROR_LOG_PATH || path.join(__dirname, '../logs/error.logs'),
					handleExceptions: true,
					json: true,
					maxsize: 10042880, // 10MB
					maxFiles: 5,
					colorize: false,
				}),
				new transports.File({
					level: 'info',
					filename: config.LOGGER.INFO_LOG_PATH || path.join(__dirname, '../logs/info.logs'),
					handleExceptions: true,
					json: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					colorize: false,
				})
			],
		});
		this.logger = logger;
		return logger;
	}
}

module.exports = Logger;