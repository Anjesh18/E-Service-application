import express from 'express'
import { isAuthenticated } from '../middlewares/Auth.js'
import { Service } from '../models/ServiceModel.js'

export const serviceRouter=express.Router()

serviceRouter.post('/post', isAuthenticated, async(req,res)=>{
    const {service, location, price}=req.body
    try {
        const newService=await Service.create({
            serviceProvider:req.id,
            service:service,
            location: location,
            price:price
        })
        return res.status(201).json({message:"Service created", success:true, newService})
    } catch (error) {
        return res.status(400).json({message:error.message, success:false})
    }
})

serviceRouter.get('/getServices',isAuthenticated, async(req,res)=>{
   try {
    const keyword=req.query.keyword || ""
    const query={
        $or:[
            {service:{ $regex: keyword, $options:"i"}},
            {location: {$regex: keyword, $options:"i"}}
        ]
    }
     const services=await Service.find(query).populate({path:"serviceProvider"})
     return res.status(201).json({message:'Services fetched successfully', success: true, services})
   } catch (error) {
    return res.status(401).json({message:error.message, success:false})
   }
})