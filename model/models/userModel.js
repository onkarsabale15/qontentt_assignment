const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;