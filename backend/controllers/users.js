const usersModel = require("../models/usersScema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../jwt");

const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (req.body.role === "recruiter" || req.body.role==="") {
    role = "6814e3dd770948ef6e8a7eb0";
  } else if (req.body.role === "job seeker") {
    role = "6814e419770948ef6e8a7eb2";
  }
  const newUser = new usersModel({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  console.log(req.body.role);
  usersModel.find({email:email}).
  then((result)=>{
  if(result.length===1){
    res.status(500).json({
      message: "The Email is already existed",
    });
  }else{
    newUser
    .save()
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "user has been added",
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
        message: "Registration Failed",
      });
    });
  }
  })
  .catch((error)=>{
console.log(error);

  })
  
};

const getUsers = (req, res) => {
  usersModel
    .find({})
    .populate("role")
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "All users",
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: error,
        message: "faild to get users",
      });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;
  usersModel
    .findOne({ email })
    .populate("role")
    .then(async (result) => {
      const token = generateToken(result);
      const hashedPassword = result.password;
      const isMatch = bcrypt.compare(password, hashedPassword);
      if (!isMatch) {
        res.status(403).json({
          data: error,
          message: "Email or password is incorrect",
        });
      } else {
        res.status(200).json({
          data: result,
          message: "Logged in successfully",
          token: token,
        });
      }
    })
    .catch((error) => {
      console.log(error);

      res.status(501).json({
        data: error,
        message: "Error in login",
      });
    });
};

module.exports = { register, login, getUsers };
