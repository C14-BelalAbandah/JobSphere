const mongoose= require("mongoose")

const cvSchema= new mongoose.Schema({
    cv:{type: String}
})


const model= mongoose.model("cv",cvSchema)
module.exports= model