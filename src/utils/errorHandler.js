class ErrorHandler extends Error {
    constructor(status = 500, message = "Something went wrong", errors = [],data=null) {
        super(message);
        this.status = status; 
        this.data=data;
        this.errors = errors; 
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
