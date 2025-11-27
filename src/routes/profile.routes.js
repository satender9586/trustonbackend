const express = require("express")
const routes = express.Router()
const {updateProfile,viewProfile} = require("../controllers/profile.controller.js")


routes.get("/view",viewProfile)
routes.patch("/update",updateProfile)

module.exports = routes;