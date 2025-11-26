const { validateSignUpInfo } = require("../utils/validate.js");
const ErrorHandler = require("../utils/errorHandler.js")
const SuccessHandler = require("../utils/successHandler.js")
const { queryAsync } = require("../config/dbConnect.js")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {

    const { firstName, lastName, phoneNumber, emailId, password } = req.body;
    const lastNameValue = lastName && lastName.trim() !== "" ? lastName : null;

    try {

        // validate input field
        const inputFieldErrors = validateSignUpInfo(req.body);
        if (inputFieldErrors.length > 0) {
            const error = new ErrorHandler(400, "signup fields are missing!", inputFieldErrors)
            return res.status(error.status).json({
                success: false,
                message: error.message,
                data :error.data,
                error: error.errors
            });
        }

        // checked is user already exists of not;
        const isUserExist = await queryAsync('SELECT emailId FROM users WHERE emailId = ?', emailId)

        if (isUserExist.length > 0) {
            const error = new ErrorHandler(400, "emailId is already exists!", isUserExist)
            return res.status(error.status).json({
                success: false,
                message: error.message,
                error: error.errors
            })
        }


        // password hashing 
        const hashPassword = await bcrypt.hash(password, 10)

        // save data;
        const saveUserInfo = await queryAsync(
            `INSERT INTO users(firstName, lastName, phoneNumber, emailId, password) VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastNameValue, phoneNumber, emailId, hashPassword]
        );

        const success = new SuccessHandler(201, "Succesfully user save", saveUserInfo)
        return res.status(success.status).json({
            success: true,
            message: success.message,
            data: success.data,
            error: success.errors
        }
        )

    } catch (error) {
            const errors = new ErrorHandler(500, error.message)
            return res.status(error.status).json({
                success: false,
                message: errors.message,
                data :errors.data,
                error: errors.errors
            });
    }
};

module.exports = { signup };
