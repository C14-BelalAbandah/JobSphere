const express= require("express")
const {getApplications,getApplicationsByUserID}= require("../controllers/applications")
const applicationsRouter= express.Router()
const authentication= require("../middleware/authentication")


applicationsRouter.get("/",authentication,getApplications)
applicationsRouter.get("/:userId",authentication,getApplicationsByUserID)

module.exports=applicationsRouter