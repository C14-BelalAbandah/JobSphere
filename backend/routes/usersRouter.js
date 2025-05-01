const express =require("express")
const {login,register}= require("../controllers/users")
const usersRouter= express.Router()

usersRouter.post("/register",register)
usersRouter.post("/login",login)

module.exports= usersRouter