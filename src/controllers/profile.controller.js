const {queryAsync} = require("../config/dbConnect");
const ErrorHandler = require("../utils/errorHandler");
const SuccessHandler = require("../utils/successHandler");

const viewProfile = async (req, res) => {
    try {
        if (!req.User || !req.User.userId) {
            const error = new ErrorHandler(401, "UserId is missing")
            return res.status(error.status).json({
                success: false,
                message: error.message,
                data: error.data,
                error: error.errors
            });
        }

        const rows = await queryAsync(
            `SELECT 
                users.firstName,
                users.lastName,
                users.emailId,
                users.phoneNumber,
                users.avatar,
                addresses.houseNo,
                addresses.street,
                addresses.landmark,
                addresses.area,
                addresses.city,
                addresses.state,
                addresses.pincode
            FROM users
            LEFT JOIN addresses 
                ON addresses.userId = users.userId
            WHERE users.userId = ?`,
            [req.User.userId]
        );


        const user = rows[0];
        if (!user) {
            const error = new ErrorHandler(404, "User not found");
            return res.status(error.status).json({
                success: false,
                message: error.message,
                data: error.data,
                error: error.errors
            });
        }

        const userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            emailId: user.emailId,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar,
            addresses: {
                houseNo: user.houseNo,
                street: user.street,
                landmark: user.landmark,
                area: user.area,
                city: user.city,
                state: user.state,
                pincode: user.pincode
            }
        };

        const success = new SuccessHandler(201, "Succesfully fetch userInfo", userInfo)
        return res.status(success.status).json({
            success: true,
            message: success.message,
            data: success.data,
            error: success.errors
        }
        )

    } catch (err) {
        const errors = new ErrorHandler(500, err.message)
        return res.status(errors.status).json({
            success: false,
            message: errors.message,
            data: errors.data,
            error: errors.errors
        });
    }
}



const updateProfile = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = { viewProfile, updateProfile }