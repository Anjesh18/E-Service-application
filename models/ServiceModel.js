import mongoose from 'mongoose'

const serviceSchema=new mongoose.Schema({
    serviceProvider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    service:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
})

export const Service=mongoose.model('Service',serviceSchema)