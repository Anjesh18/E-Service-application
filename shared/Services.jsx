import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { LocateIcon, Pin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Services({service}) {
  const [isApplied,setIsApplied]=useState('')
  const navigate=useNavigate()
  return (
    <div className='rounded-xl shadow-xl m-4 max-h-[300px]'>
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col py-4 px-8 my-3'>
            <div className='font-bold text-2xl'>{service.service}</div>
            <div className='my-4  text-sm'>{service?.serviceProvider?.fullname}</div> 
            <div className=' text-sm'>Location: {service?.location}</div>
            <div className='mt-5'><Badge>{service?.price} Rs</Badge></div>
            </div>
        
        <div><img className='h-[100px] mt-3 rounded-full w-[100px] m-5' src={service?.serviceProvider?.profilePhoto}/></div>
        </div>
      <div className='flex justify-center items-center p-4'>
      < Button type='outline' onClick={()=>navigate(`/confirm/${service._id}`)} className='w-full bg-green-900'>Send Request</Button>
      </div>
    </div>
  )
}
