const rolesModel = require("../models/roleSchema");

const createRole = (req, res) => {
 const {role, permissions}= req.body
 

 const newRole= new rolesModel({
    role, permissions
 })
 
newRole.save()
.then((result)=>{
 res.status(201).json({
    data:result,
    message: "role has been added",
    role: role,
 })
})
.catch((error)=>{
    res.status(500).json({
        data:error,
        message: "faild to add role"
     })
})
};

module.exports = { createRole };
