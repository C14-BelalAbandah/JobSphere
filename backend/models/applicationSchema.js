const mongoose=require("mongoose")

const applicationSchema= new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    education:{tpye:String, required:true},
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "users"},
    jobId: {type:mongoose.Schema.Types.ObjectId,ref: "jobs"}
})



const model= mongoose.model("application", applicationSchema)
module.exports= model