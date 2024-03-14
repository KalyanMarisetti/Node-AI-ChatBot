/**
 * @constant jwt library to generate jwt token
 */
const jwt = require('jsonwebtoken');

/**
 * @constant bcrypt bcrypt to encrypt password
 */
const bcrypt = require('bcryptjs');

/**
 * @constant config config values
 */
const config = require('./config');

/**
 * @constant axios to make requests to 3rd party services
 */
const { default: axios } = require('axios');

/**
  * @constant fs node.js buit in file system module
  */
const fs = require('fs');

/**
 * @constant mongoose object relation mapper - orm for database
 */
const mongoose = require('mongoose');
const Logger = require('./Logger');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @class Default methods of the application
 * @desc contains all the default methods of the application.
 * @returns various methods 
 */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Base extends Logger {
	constructor() {
		super();
		this.saltRounds = 10;
		this.jwtSecretKey = config.SERVER.JWT_SECRET;
		this.expiresIn = { expiresIn: '7d' };
		this.axios = axios;
		this.fs = fs;
		this.db = mongoose.connection.db;
		this.paginationOffset = 0;
		this.paginationLimit = 10;
	}

	/**
	 * @method jwt to generate token
	 * @description generate jwt token 
	 * @param {*} data to be passed for token
	 * @returns jwt token
	 */
	async jwt(data) {
		return jwt.sign(data, this.jwtSecretKey, this.expiresIn);
	}

	/**
	 * @method hashData 
	 * @description hashes the content that is passed
	 * @param {*} data content to be hashed
	 * @returns successful hashed content
	 */
	async hashData(data) {
		return bcrypt.hashSync(data, this.saltRounds);
	}

	/**
	* @method validateHashData 
	* @description validates the hashed content that is passed
	* @param {*} data content to be validated
	* @returns boolean response
	*/
	async validateHashData(data, hash) {
		return bcrypt.compareSync(data, hash);
	}

	/**
	 * @method encodeToBase64
	 * @description Encode data to base64
	 * @param {*} data 
	 * @returns 
	 */
	encodeToBase64(data) {
		try {
			if (!data) return '';
			return Buffer.from(JSON.stringify(data)).toString('base64');
		} catch (error) {
			this.logger.error('Inside Base: encodeToBase64 method: Error while encoding data', error);
			return data;
		}
	}

	/**
	 * @method decodeFromBase64
	 * @description Decode data from base64 string
	 * @param {*} data 
	 * @returns 
	 */
	decodeFromBase64(data) {
		try {
			if (!data) return '';
			let decodedData = Buffer.from(data, 'base64').toString();
			decodedData = decodedData.replace(/"/g, '');
			return decodedData;
		} catch (error) {
			this.logger.error('Inside Base: encodeToBase64 method: Error while encoding data', error);
			return data;
		}
	}
}

module.exports = Base;
