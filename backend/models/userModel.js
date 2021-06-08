const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{type:String,require:[true,"User must have Name"],unique:true}, 
    password:{type:String,require:[true,"User must have Password"]},
    adminrights:{type:Number,require:[true,"User must have Adminrights"]}
});
const User = mongoose.model("User",userSchema);
module.exports = User;