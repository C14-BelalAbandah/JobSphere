const express= require("express")
const {getApplications}= require("../controllers/applications")
const applicationsRouter= express.Router()
const authentication= require("../middleware/authentication")


applicationsRouter.get("/",authentication,getApplications)

module.exports=applicationsRouter