import express from 'express'
import { User } from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { singleUpload } from '../middlewares/Multer.js'
import getDataUri from '../utils/datauri.js'
import cloudinary from '../utils/Cloudinary.js'
export const router=express.Router()

router.post('/register',singleUpload, async(req,res)=>{
    const {fullname,email,phoneNumber,password}=req.body
    try {
        
            const files=req.file
            const fileUri=getDataUri(files)
            const cloudRes=await cloudinary.uploader.upload(fileUri.content)
        
       
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists", success: false})
        }
        const hashedPass=await bcrypt.hash(password,10)
        const newUser=await User.create({
            fullname:fullname,
            email:email,
            phoneNumber:phoneNumber,
            password:hashedPass,
            profilePhoto:cloudRes?.secure_url
        })
        return res.status(201).json({message:"User registered successfully", success:true})
    } catch (error) {
        return res.status(404).json({message:error.message,success:false})
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User does not exist", success:false})
        }
        const pass=await bcrypt.compare(password, user.password)
        if(!pass){
            return res.status(400).json({message:"Incorrect password", success:false})
        }
        const token=jwt.sign({userId:user._id},'secret123',{expiresIn:"24h"})
        const loggedinUser={
            userId:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            profilePhoto:user?.profilePhoto
        }
        res.status(201).cookie('token', token, {
            maxAge: 24*60*60*60*1000,
            httpsOnly: true
        }).json({message:`Welcome back ${user.fullname}`, success:true, loggedinUser})
    } catch (error) {
        return res.status(402).json({message:error.message,success:false})
    }
})