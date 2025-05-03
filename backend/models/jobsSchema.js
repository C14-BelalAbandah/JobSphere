const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  location: { type: String, required: true },
  jobPoster: {type:mongoose.Schema.Types.ObjectId,ref: "users"}
});

const model = mongoose.model("jobs", jobSchema);

module.exports = model;
