const express = require("express")
const routes = express.Router()
const {signup,signin,signout} = require("../controllers/auth.contoller.js")


routes.post("/signup",signup)
routes.post("/signin",signin)
routes.post("/singout",signout)

module.exports = routes