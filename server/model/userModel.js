const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique:true
      },
      phone:{
        type:String,
        required:true,
        unique:true
      }, 
      password: {
        type: String,
        required: true,
      },
      role:{
        type:String,
        enum:["student","tutor","admin"]
      },
      user_id:{
        type:String,
        unique:true
      },
      profileImage: {
        type: String,
      },
      isActive:{
        type:Boolean,
        default:true
      },
      resetPasswordToken: String,
      resetPasswordExpires: Date
},{ timestamps: true });


const User = mongoose.model("user",userSchema)

module.exports= User