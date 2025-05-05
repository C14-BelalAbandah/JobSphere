const express = require("express");
const jobsRouter = express.Router();
const authentication = require("../middleware/authentication")
const authorization= require("../middleware/authorization")
const {
  getAllJobs,
  addJob,
  editJob,
  removeJob,
  newApplication,
  getJobByPosterId,
  getJobByTitle
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.get("/:jobPosterId", authentication,getJobByPosterId);
jobsRouter.get("/jobByTitle/:jobTitle", authentication,getJobByTitle);
jobsRouter.post("/", authentication,authorization("ADD_POST"),addJob);
jobsRouter.post("/:jobId", authentication,newApplication);
jobsRouter.put("/:id",authentication,authorization("ADD_POST"), editJob);
jobsRouter.delete("/:id",authentication,authorization("ADD_POST"), removeJob);






module.exports = jobsRouter;
