// filepath: c:\Users\Dell\Desktop\e-serve\frontend\src\components\shared\Services.jsx
import React, { useState, useEffect } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Services({ service }) {
  const [applicationStatus, setApplicationStatus] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:8888/api/applications/getStatus/${service._id}`, { withCredentials: true })
      .then(res => setApplicationStatus(res.data.status))
      .catch(() => setApplicationStatus(null))
  }, [service._id])

  let buttonText = "Send Request"
  let disabled = false
  if (applicationStatus === "accepted") {
    buttonText = "Accepted"
    disabled = true
  } else if (applicationStatus === "rejected") {
    buttonText = "Rejected"
    disabled = true
  } else if (applicationStatus === "pending") {
    buttonText = "Already Applied"
    disabled = true
  }

  return (
    <div className='rounded-xl shadow-xl m-4 max-h-[300px]'>
      {/* ...existing card code... */}
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col py-4 px-8 my-3'>
          <div className='font-bold text-2xl'>{service.service}</div>
          <div className='my-4  text-sm'>{service?.serviceProvider?.fullname}</div>
          <div className=' text-sm'>Location: {service?.location}</div>
          <div className='mt-5'><Badge>{service?.price} Rs</Badge></div>
        </div>
        <div>
          <img className='h-[100px] mt-3 rounded-full w-[100px] m-5' src={service?.serviceProvider?.profilePhoto} />
        </div>
      </div>
      <div className='flex justify-center items-center p-4'>
        <Button
          type='outline'
          onClick={() => navigate(`/confirm/${service._id}`)}
          className='w-full bg-green-900'
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}