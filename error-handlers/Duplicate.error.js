/**
 * Custom Error class to handle Duplicate error
 */
class DuplicateError extends Error {
    constructor(message, statusCode) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.statusCode = statusCode || 409;

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = DuplicateError;