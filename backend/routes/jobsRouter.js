const express = require("express");
const jobsRouter = express.Router();
const authentication = require("../middleware/authentication")
const authorization= require("../middleware/authorization")
const {
  getAllJobs,
  addJob,
  editJob,
  removeJob,
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.post("/", authentication,authorization("ADD_POST"),addJob);
jobsRouter.put("/:id", editJob);
jobsRouter.delete("/:id", removeJob);

module.exports = jobsRouter;
