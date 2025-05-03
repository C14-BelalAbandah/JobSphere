const express = require("express");
const jobsRouter = express.Router();
const authentication = require("../middleware/authentication")
const authorization= require("../middleware/authorization")
const {
  getAllJobs,
  addJob,
  editJob,
  removeJob,
  newApplication
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.post("/", authentication,authorization("ADD_POST"),addJob);
jobsRouter.put("/:id",authentication,authorization("ADD_POST"), editJob);
jobsRouter.delete("/:id",authentication,authorization("ADD_POST"), removeJob);
jobsRouter.post("/:jobId", authentication,newApplication);


module.exports = jobsRouter;
