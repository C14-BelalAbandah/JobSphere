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

const getApplicationsByUserID = (req,res)=>{
 const userId= req.params.userId
 applicationModel.find({userId:userId})
 .populate("jobId")
 .then((result)=>{
    console.log(result)
    res.status(200).json({
        data:result,
        message: "Your applications"
    })    
 })
 .catch((error)=>{
    console.log(error)
    res.status(404).json({
        error:error,
        message: "No applications Jobs"
    })
    
})
}

module.exports = { getApplications,getApplicationsByUserID };
