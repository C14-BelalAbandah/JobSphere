const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: { type: String, required: true },
});

const model = mongoose.model("roles", roleSchema);

module.exports = model;
