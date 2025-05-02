const express = require("express");
const jobsRouter = express.Router();
const {
  getAllJobs,
  addJob,
  editJob,
  removeJob,
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.post("/", addJob);
jobsRouter.put("/:id", editJob);
jobsRouter.delete("/:id", removeJob);

module.exports = jobsRouter;
