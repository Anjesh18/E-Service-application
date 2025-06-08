import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setApplicants } from "@/redux/ApplicantSlice";

export default function ServiceProviderCard({ item }) {
    const dispatch=useDispatch()
   const fetchData=async()=>{
    const response=await axios.get(`http://localhost:8888/api/applications/applicant/${item._id}`, {withCredentials:true})
    if(response.data.success){
        console.log(response.data.service)
        dispatch(setApplicants(response.data.service))
       navigate(`/service/applicant/${item._id}`)
    }else{
        console.log("some error occured")
    }
   }
    const navigate=useNavigate()
  return (
    <div className="m-5 p-2">
      <div className="w-full flex flex-row space-5 justify-between rounded-2xl shadow-2xl p-4 px-7">
        <div className="flex flex-col">
          <h1 className="text-xl my-2 ">Service name: {item?.service}</h1>
          
          
          <h1 className="text-md my-2">Location: {item?.location}</h1>
          <p className="my-2">Fee: {item?.price}/-</p>
        </div>
        <div className='flex flex-row mt-7 gap-9'>
            <Button className='bg-red-800 hover:bg-red-700' onClick={()=> navigate(`/confirmDelete/${item?._id}`)}>Delete</Button>
            <Button className='bg-green-800 hover:bg-green-700' key={item?._id} onClick={()=>fetchData()}>View Requests</Button>
        </div>
      </div>
    </div>
  );
}
