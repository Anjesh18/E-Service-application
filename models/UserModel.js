import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePhoto:{
        type:String,
      
    }
})

export const User=mongoose.model('User', userSchema)