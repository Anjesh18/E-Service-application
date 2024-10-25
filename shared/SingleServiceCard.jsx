import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function SingleServiceCard({ service }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl m-5 p-4 shadow-2xl mx-auto">
      <div className="">
        <div className="flex flex-row m-2 gap-6 ">
          <div className=" w-[100px] h-[110px] items-center justify-between">
            <img
              className="rounded-full flex justify-center items-center"
              src={service?.serviceProvider?.profilePhoto}
            />
          </div>
          <div className='flex flex-col items-start'>
            <h1 className='text-2xl mb-3 font-bold'>{service?.service}</h1>
            <p1 className='my-2 text-lg '>Name: {service?.serviceProvider.fullname}</p1>
            <p1 className='my-2 text-md '>Location: {service?.location}</p1>
            
            <Badge className='my-3 w-16 justify-center bg-green-800 h-9'>{service?.price}/-</Badge>
          </div>
        </div>
        <div className='flex  flex-row justify-between'>
          <Button variant="outline" className=''>View details</Button>
          <Button>Save for later</Button>
        </div>
      </div>
    </div>
  );
}
