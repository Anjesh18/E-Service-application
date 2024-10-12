import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export default function SingleServiceCard({service}) {
  return (
    
      <div className='max-w-1/3 rounded-xl m-5 p-4 shadow-2xl'>
       <div className='flex flex-row '>
        <div>
        <img src={service?.serviceProvider?.profilePhoto}/>
        </div>
        <div className='flex flex-col'>
        <div className='my-3 px-3'><h1 className='text-xl font-bold'>{service?.service}</h1></div>
        <div className='my-1 px-3'> Serice Provider: {service?.serviceProvider?.fullname}</div>
        <div className='px-3 my-1'>Location: {service?.location}</div>
        <div className='px-3 my-2'><Badge className="bg-purple-700">{service?.price} Rs</Badge></div>
        <div className='flex flex-row justify-between items-center my-2 px-3'><div><Button variant="outline">View details</Button></div>
        <Button variant="outline">Save for later</Button></div>
        </div>
       </div>
      </div>
    
  )
}
