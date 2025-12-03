const express = require("express")
const routes = express.Router()
const authMiddleware = require("../middleware/authMiddleware.js")
const{addServices,addServiceCategories,addServiceItem ,addServiceItemFeaturese,getServices,updateService, removeService} = require("../controllers/services.contoller.js")

routes.post("/admin/add/sevice", addServices)
routes.post("/admin/add/seviceCategories", addServiceCategories)
routes.post("/admin/add/seviceServiceItem", addServiceItem)
routes.post("/admin/add/serviceItemFeaturese", addServiceItemFeaturese)
routes.get("/retriveServices", getServices)
routes.put("/admin/update/sevice", updateService)
routes.delete("/admin/delete/sevice", removeService)

module.exports = routes