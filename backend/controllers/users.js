const usersModel = require("../models/usersScema");
const bcrypt = require("bcrypt");


const register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (req.body.role=== "recruiter"){
    role= "6814e3dd770948ef6e8a7eb0"
  }else if(req.body.role=== "job seeker"){
 role= "6814e419770948ef6e8a7eb2"
  }
  const newUser= new usersModel({
    firstName, lastName, email, password,role
  })
  
  console.log(req.body.role);
  newUser.save()
  .then((result)=>{
    res.status(201).json({
       data:result,
       message: "user has been added",
       
    })
   })
   .catch((error)=>{
       res.status(500).json({
           data:error,
           message: "faild to add user"
        })
   })

};

const getUsers= (req,res)=>{
    usersModel.find({})
    .populate("role")
    .then((result)=>{
        res.status(201).json({
           data:result,
           message: "All users",
           
        })
       })
       .catch((error)=>{
           res.status(500).json({
               data:error,
               message: "faild to get users"
            })
       })
}
const login = (req, res) => {};

module.exports = { register, login,getUsers };
