const express = require("express");
const { login, register,getUsers } = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/", getUsers);

module.exports = usersRouter;
