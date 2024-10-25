import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setApprovedApplicants } from "@/redux/ApplicantSlice";

export default function ApplicantDetails() {
    const { applicants } = useSelector((store) => store.applicant);
    const dispatch=useDispatch()
    const [approved,setApproved]=useState(false)
  
   // const {approvedApplicants}=useSelector(store=>store.applicant)
  const states=['Accept','Reject']
//   const [inputStatus,setInputStatus]=useState('')
  const updateStatus=async(status,id)=>{
    const response=await axios.post(`http://localhost:8888/api/applications/applicant/updateStatus/${id}`, {status},{withCredentials:true})
    if(response.data.success){
        toast.success(response.data.message)
        console.log("updated successfully")
        setApproved(true)
    }
}
  return (
    <div className=" ">
      {applicants?.application.map((item) => (
    
        <div
          key={item._id}
          className="flex flex-col  mx-auto max-w-4xl p-8 m-5  shadow-2xl rounded-2xl"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-7">
              <h1 className="text-2xl font-bold">
                {" "}
                {item?.applicant?.fullname}
              </h1>
              <h3>Phone number: {item?.applicant?.phoneNumber}</h3>
              <h3>Email: {item?.applicant?.email}</h3>
            </div>
            <div className="w-[100px] h-[100px]">
              <img
                src={item?.applicant?.profilePhoto}
                className="rounded-full"
              />
            </div>
          </div>
          <div className='flex flex-row justify-between px-[60px] pt-8'>
            {
                states.map((state,idx)=>{
                    return (
                        <Button key={idx} onClick={()=>updateStatus(state,item?._id)}>{state}</Button>
                        
                    )
                   
                })
               
            }
            </div>
        </div>
      ))}
    </div>
  );
}
