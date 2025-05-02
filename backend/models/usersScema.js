const mongoose = require("mongoose");
const bcrypt= require("bcrypt")
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
});



userSchema.pre("save", async function (){
try {
  this.email= this.email.toLowerCase()
  console.log("this.email :",this.email);
  
  this.password= await bcrypt.hash(this.password,5)
  
} catch (error) {
  console.log("error in hasing the password: ",error);
  
}
})
const model = mongoose.model("users", userSchema);
module.exports = model;
