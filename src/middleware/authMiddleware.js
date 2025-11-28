const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
    try {
        const token = (req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null) ||
            req.cookies?.accessToken ||
            req.body?.accessToken;

            if (!token) {
            const error = new ErrorHandler(401, "Token missing")
            return res.status(error.status).json({
                success: false,
                message: error.message,
                data: error.data,
                error: error.errors
            });
        }

        const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.User = decode
        next();

    } catch (error) {
        const errors = new ErrorHandler(500, error.message);
        return res.status(errors.status).json({
            success: false,
            message: errors.message,
            data: errors.data,
            error: errors.errors
        });
    }
};

module.exports = authMiddleware;
