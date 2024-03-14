/**
 * @constant mongoose orm library for mongodb database
 */
const mongoose = require('mongoose');

const { COLLECTION_STATUS } = require('../../constants/collection-status/CollectionStatus.constants');

/**
  * @constant Joi data validation library
  */
const Joi = require('joi');

const chatSchema = new mongoose.Schema({
	role: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
});

/**
 * @constant userSchema schema for users module
 */
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		min: 1,
		max: 50
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: [COLLECTION_STATUS.ACTIVE, COLLECTION_STATUS.INACTIVE],
		default: COLLECTION_STATUS.ACTIVE
	},
	chats: [chatSchema],
}, { timestamps: true });

const UserModel = mongoose.model('users', userSchema);

/** USer schema validation with joi*/
/**
  * @constant usersSchemaValidator validation for users module will be used in users middleware
  */
const usersSchemaValidator = Joi.object({
	name: Joi.string().required(),
});

module.exports = {
	UserModel,
	usersSchemaValidator
};