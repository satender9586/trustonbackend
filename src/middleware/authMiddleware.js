const ErrorHandler = require("../utils/errorHandler");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        console.log("Token:", token);

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
