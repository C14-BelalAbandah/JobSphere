const applicationModel = require("../models/applicationSchema");

const getApplications= (req,res)=>{
    applicationModel.find({})
    .populate("userId")
    .populate("jobId")
    .then((result)=>{
        res.status(200).json({
            data:result,
            message: "All applications"
          })
    })
    .catch((error)=>{
        res.status(501).json({
            data:error,
            message: "Error in getting the applications"
          })
    })
}

module.exports = { getApplications };
