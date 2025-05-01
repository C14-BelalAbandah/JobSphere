const mongoose = require("mongoose")

const userSchema=  new mongoose.Schema ({
    firstName: {type: String, required:true},
lastName: {type:String},
email: {type:String, required:true, unique:true},
password: {type:String, required:true},
role: {type: mongoose.Schema.Types.ObjectId, ref:"role"}
})


const model= mongoose.model("users",userSchema)

module.exports= model