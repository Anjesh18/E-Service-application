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

serviceRouter.get('/getService/:id',async(req,res)=>{
   
    const serviceId=req.params.id

    const getServiceById=await Service.findById(serviceId).populate({path:"application"})
    
    if(!getServiceById){
        return res.status(401).json({message:"Some error occured", success:false})
    }
    return res.status(201).json({success:true, getServiceById})
})

serviceRouter.get('/getServiceForUser', isAuthenticated, async(req,res)=>{
    const userId=req.id
    const services=await Service.find({serviceProvider:userId})
    if(!services){
        return res.status(402).json({message:"No service has been posted by you", success: false})
    }
    return res.status(202).json({message:"Services found!", success: true, services})
})

serviceRouter.delete('/deleteService/:id', isAuthenticated, async(req,res)=>{
    const serviceId=req.params.id
   const userId=req.id
    const deleteService=await Service.findOneAndDelete(serviceId)
    if(!deleteService){
        return res.status(404).json({message:"Could not delete", success: false})
    }
    return res.status(201).json({message:"Deleted successfully", success: true})
})