const express = require("express")
const routes = express.Router()
const authMiddleware = require("../middleware/authMiddleware.js")
const{addServices,addServiceCategories,addServiceItem ,
    addServiceItemFeaturese,getServices,
    createBooking
} = require("../controllers/services.contoller.js")

routes.post("/admin/add/sevice", addServices)
routes.post("/admin/add/seviceCategories", addServiceCategories)
routes.post("/admin/add/seviceServiceItem", addServiceItem)
routes.post("/admin/add/serviceItemFeaturese", addServiceItemFeaturese)
routes.get("/retriveServices", getServices)
routes.post("/bookService", createBooking)


module.exports = routes