const express= require("express")
const {newApplication}= require("../controllers/applications")
const applicationsRouter= express.Router()


applicationsRouter.post("/",newApplication)
module.exports=applicationsRouter