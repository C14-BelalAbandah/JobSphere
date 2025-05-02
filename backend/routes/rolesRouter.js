const express = require("express");
const rolesRouter = express.Router();
const { createRole } = require("../controllers/roles");

rolesRouter.post("/", createRole);

module.exports = rolesRouter;
