const applicationModel = require("../models/applicationSchema");

const newApplication = (req, res) => {
  const { firstName, lastName, email, education } = req.body;
  const userId = req.token.userId;
  const jobId = req.params.jobId;
  const newApplication = new applicationModel({
    firstName,
    lastName,
    email,
    education,
    userId,
    jobId,
  });
  newApplication.save()
  .then((result)=>{
  res.status(201).json({
    data:result,
    message: "Your application was submitted successfully"
  })
  })
  .catch((error)=>{
    res.status(501).json({
        data:error,
        message: "Error in submitting the application"
      })
  })
  
};

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

module.exports = { newApplication,getApplications };
