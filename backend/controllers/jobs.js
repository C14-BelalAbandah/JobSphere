const jobsModel = require("../models/jobsSchema");

const getAllJobs = (req, res) => {
  jobsModel
    .find({})
    .populate("jobPoster")
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "All jobs",
      });
    })
    .catch((error) => {
      res.status(501).json({
        data: error,
        message: "error in getting jobs",
      });
    });
};
const addJob = (req, res) => {
  const { title, description, requirements, location } = req.body;
  const jobPoster = req.token.userId;
  const newJob = new jobsModel({
    title,
    description,
    requirements,
    location,
    jobPoster,
  });

  newJob
    .save()
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "the job has been added successfully",
      });
    })
    .catch((error) => {
      res.status(501).json({
        data: error,
        message: "error in adding the job",
      });
    });
};
const editJob = (req, res) => {
  const jobId = req.params.id;
  const { title, description, requirements, location } = req.body;
  const modifierId = req.token.userId;
  const midifiedJob = { title, description, requirements, location };

  jobsModel
    .findById(jobId)
    .populate("jobPoster", "_id")
    .then((result) => {
      if (result.jobPoster._id.toString() === modifierId) {
        jobsModel
          .findOneAndUpdate(
            { _id: jobId },
            { $set: midifiedJob },
            { new: true }
          )
          .then((result) => {
            res.status(200).json({
              data: result,
              message: "the job has been modified successfully",
            });
          })
          .catch((error) => {
            res.status(501).json({
              data: error,
              message: "error in modifying the job",
            });
          });
      } else {
        res.status(501).json({
          message: "you are not allowed to edit this job",
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        data: error,
        message: "error in finding the job",
      });
    });
};
const removeJob = (req, res) => {};

module.exports = { getAllJobs, addJob, editJob, removeJob };
