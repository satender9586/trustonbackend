const { validateSignUpInfo, validateLoginInfo } = require("../utils/validate.js");
const ErrorHandler = require("../utils/errorHandler.js")
const SuccessHandler = require("../utils/successHandler.js")
const { queryAsync } = require("../config/dbConnect.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { tokenGenerate } = require("../utils/token.js")
const {cookieAccessOptions,cookieRefreshOptions} = require("../utils/cookie.js")



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
                data: error.data,
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
            data: errors.data,
            error: errors.errors
        });
    }
};

const signin = async (req, res) => {
    const { emailId, password } = req.body;

    try {
        // validate input field
        const inputFieldErrors = validateLoginInfo(req.body);
        if (inputFieldErrors.length > 0) {
            const error = new ErrorHandler(400, "login fields are missing!", inputFieldErrors)
            return res.status(error.status).json({
                success: false,
                message: error.message,
                data: error.data,
                error: error.errors
            });
        }

        // checked is user already exists of not;
        const isUserExist = await queryAsync('SELECT userId, emailId, password FROM users WHERE emailId = ?', emailId)

        if (isUserExist.length == 0) {
            const error = new ErrorHandler(400, "emailId and user is not exists!", isUserExist)
            return res.status(error.status).json({
                success: false,
                message: error.message,
                error: error.errors
            })
        }
        const userInfo = isUserExist[0]

        // password verification
        const isPasswordVerify = await bcrypt.compare(password, userInfo.password)
        if (!isPasswordVerify) {
            const error = new ErrorHandler(400, "invalid password try again!")
            return res.status(error.status).json({
                success: false,
                message: error.message,
                error: error.errors
            })
        }
        const { accessToken, refreshToken } = await tokenGenerate({ emailId: userInfo.emailId, userId: userInfo.userId })
        const success = new SuccessHandler(200, "Succesfully Login", { emailId: userInfo.emailId, userId: userInfo.userId, accessToken, refreshToken })
        return res.status(success.status)
            .cookie("accessToken", accessToken, cookieAccessOptions)
            .cookie("refreshToken", refreshToken, cookieRefreshOptions)
            .json({
                success: true,
                message: success.message,
                data: success.data,
                error: success.errors,
            });


    } catch (error) {
        const errors = new ErrorHandler(500, error.message)
        return res.status(error.status).json({
            success: false,
            message: errors.message,
            data: errors.data,
            error: errors.errors
        });
    }
}

const signout = async (req, res) => {
    try {
        const success = new SuccessHandler(200, "Succesfully Logout")
        return res.status(success.status)
            .cookie("accessToken", null, cookieOptions)
            .cookie("refreshToken", null, cookieOptions)
            .json({
                success: true,
                message: success.message,
                data: success.data,
                error: success.errors,
            });
    } catch (error) {
        const errors = new ErrorHandler(500, error.message)
        return res.status(error.status).json({
            success: false,
            message: errors.message,
            data: errors.data,
            error: errors.errors
        });
    }
}





module.exports = { signup, signin,signout };
