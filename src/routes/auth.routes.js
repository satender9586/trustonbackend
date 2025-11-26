const express = require("express")
const routes = express.Router()
const {signup} = require("../controllers/auth.contoller.js")


routes.post("/signup",signup)

module.exports = routes