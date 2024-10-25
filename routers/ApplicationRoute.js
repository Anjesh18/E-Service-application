import express from "express";
import { Application } from "../models/ApplicationModel.js";
import { Service } from "../models/ServiceModel.js";
import { isAuthenticated } from "../middlewares/Auth.js";
export const applicationRouter = express.Router();

applicationRouter.get("/apply/:id", isAuthenticated, async (req, res) => {
  const userId = req.id;
  const serviceId = req.params.id;
  const service = await Service.findById(serviceId);
  if (!service) {
    console.log("service not found");
    return res
      .status(401)
      .json({ message: "Service not found", success: false });
  }

  // const alreadyApplied=await Application.find({applicant: userId})
  // if(alreadyApplied){
  //   return res.json(401).json({message:"Already applied to this service", success: false})
  // }
  const newServiceApplication = await Application.create({
    service: serviceId,
    applicant: userId,
  });
  service.application.push(newServiceApplication._id);
  service.save();
  if (!newServiceApplication) {
    return res
      .status(401)
      .json({ message: "Some error occured", success: false });
  }
  return res
    .status(201)
    .json({ message: "Applied successfully", success: true });
});

applicationRouter.get("/get/:id", async (req, res) => {
  const userId = req.id;
  const application = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({ path: "service" });
  if (!application) {
    return res
      .status(401)
      .json({ message: "Applications could not be fetched", success: false });
  }
  return res
    .status(201)
    .json({ message: "Fetched successfully", success: true, application });
});

applicationRouter.get("/applicant/:id", isAuthenticated, async (req, res) => {
  const serviceId = req.params.id;
  const service = await Service.findById(serviceId).populate({
    path: "application",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
    },
  });

  if (!service) {
    return res
      .status(402)
      .json({ message: "Service not found", success: false });
  }
  return res
    .status(201)
    .json({ message: "Applicants found", success: true, service });
});


applicationRouter.post('/applicant/updateStatus/:id',isAuthenticated, async(req,res)=>{
  const {status}=req.body
  const applicationId=req.params.id

  const application=await Application.findOne({_id:applicationId})

  if(!application){
    return res.status(404).json({message:"Application not found", success:false})
  }

  application.status=status
  await application.save()
  
  return res.status(201).json({message:"Updated successfully", success:true})
})

applicationRouter.get('/aplicant/getApprovedApplicants/:id',isAuthenticated,async(req,res)=>{
  const applicationId=req.params.id
  try {
    const application=await Application.findById(applicationId)
    const getStatus=[]
    getStatus.push(application.status=='Accept'||'Reject')
    return res.status(201).json({message:"Status fetched successfully", success: true, getStatus})
  } catch (error) {
    return res.status(402).json({message:error.message, success:false})
  }
})