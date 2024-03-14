/**to indicate that the code should be executed in "strict mode"*/
'use strict';

require('dotenv').config();
const assert = require('assert');

/**
 * SECRET variables from environment file
 */
const {
    // Server and Env variables
    PORT, JWT_SECRET, DATABASE_URI, REPLICA_SET_NAME, BASE_DB_URI, ADMIN_DB_NAME,

    // Logger variables
    INFO_LOG_PATH, ERROR_LOG_PATH,

} = process.env;

assert(PORT, 'PORT is required');
assert(DATABASE_URI, 'DATABASE_URI is required');
assert(JWT_SECRET, 'JWT_SECRET is required');

module.exports = {
    SERVER: {
        PORT: PORT,
        JWT_SECRET: JWT_SECRET
    },
    LOGGER: {
        INFO_LOG_PATH: INFO_LOG_PATH,
        ERROR_LOG_PATH: ERROR_LOG_PATH
    },
    DATABASE: {
        URI: DATABASE_URI,
        REPLICA_SET_NAME: REPLICA_SET_NAME
    },
    BASE_DB_URI: BASE_DB_URI,
    ADMIN_DB_NAME: ADMIN_DB_NAME,
};