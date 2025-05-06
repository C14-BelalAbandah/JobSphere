const express = require("express");
const { login, register,getUsers } = require("../controllers/users");
const usersRouter = express.Router();
const authentication= require("../middleware/authentication")
const authorization= require("../middleware/authorization")
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", authentication, getUsers);

module.exports = usersRouter;
