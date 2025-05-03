const express= require("express")
const {newApplication,getApplications}= require("../controllers/applications")
const applicationsRouter= express.Router()
const authentication= require("../middleware/authentication")


applicationsRouter.post("/:jobId",authentication,newApplication)
applicationsRouter.get("/",authentication,getApplications)

module.exports=applicationsRouter