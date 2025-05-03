const jobsModel = require("../models/jobsSchema");

const getAllJobs = (req, res) => {
    jobsModel.find({})
    .populate("jobPoster")
    .then((result)=>{
    res.status(201).json({
        data:result,
        message: "All jobs"
    })
    })
    .catch((error)=>{
        res.status(501).json({
            data:error,
            message: "error in getting jobs"
        }) 
    })
};
const addJob = (req, res) => {
  const { title, description, requirements, location } = req.body;
  const jobPoster=req.token.userId
  const newJob= new jobsModel({
    title, description, requirements, location,jobPoster
  })
 
  newJob.save()
  .then((result)=>{
    res.status(201).json({
        data:result,
        message: "the job has been added successfully"
    })
  })
  .catch((error)=>{
    res.status(501).json({
        data:error,
        message: "error in adding the job"
    })
  })
};
const editJob = (req, res) => {};
const removeJob = (req, res) => {};

module.exports = { getAllJobs, addJob, editJob, removeJob };
