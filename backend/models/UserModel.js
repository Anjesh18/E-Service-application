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
        required:false
    },
    appliedServices:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    }]
})

export const User=mongoose.model('User', userSchema)