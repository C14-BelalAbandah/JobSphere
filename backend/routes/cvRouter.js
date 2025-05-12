const express= require("express")
const cvRouter= express.Router()
const cvUploadMiddleWare=require("../middleware/CVUpload")
const {uploadCv}= require("../controllers/cvUpload")
 cvRouter.post("/", cvUploadMiddleWare.single("cv"),uploadCv )



 module.exports= cvRouter