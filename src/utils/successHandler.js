class SuccessHandler {
    constructor(status, message, data = null, errors = []) {
        this.status = status;      
        this.message = message;   
        this.data = data;          
        this.errors = errors;      
    }
}

module.exports = SuccessHandler;
