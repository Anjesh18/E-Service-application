import mongoose from "mongoose";

const applicationSchema=new mongoose.Schema({
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service",
        required: true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','Accept','Reject'],
        default:'pending'
    }
},{
    timestamps:true
})

export const Application=mongoose.model('Application', applicationSchema)