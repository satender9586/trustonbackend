const jwt = require("jsonwebtoken")
require("dotenv").config()

const accessTokenGenerate = async ({userId, emailId})=>{
    try {
        const accessToken = jwt.sign({userId, emailId}, process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME})
        return accessToken;
    } catch (error) {
        throw new error("Access Token error : ", error.message)
    }
    
}

const refreshTokenGenerate = async ({userId, emailId})=>{
    try {
        const accessToken = jwt.sign({userId, emailId}, process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE_TIME})
        return accessToken;
    } catch (error) {
        throw new error("Access Token error : ", error.message)
    }
    
}

const tokenGenerate =async (userData) =>{
    try {   
        const accessToken =await  accessTokenGenerate(userData)
        const refreshToken =await  refreshTokenGenerate(userData)
        return {accessToken, refreshToken}

    } catch (error) {
        throw new error("Some this is Wrong", error.message)
    }
}

module.exports = {accessTokenGenerate, tokenGenerate}