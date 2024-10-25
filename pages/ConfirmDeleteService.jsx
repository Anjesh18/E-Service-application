import { Button } from '@/components/ui/button'
import { setSingleService } from '@/redux/ServiceSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function ConfirmDeleteService() {
    const navigate=useNavigate()
    const {id}=useParams()
    const dispatch=useDispatch()
    const serviceId=id
    const handleDelete=async()=>{
        const response=await axios.delete(`http://localhost:8888/api/service/deleteService/${serviceId}`, {withCredentials:true})
        if(response.data.success==true){
            toast("Deleted successfully")
            navigate('/profile')
            
        }
    }
   

  return (
    <div className='flex max-w-5xl mx-auto my-[200px] rounded-2xl justify-center p-6 items-center border border-gray-600'>
     <div className='flex flex-col'>
        <h1 className='text-3xl font-extrabold gap-3 text-[#6753c4] my-3'> Do you really want to delete this service?<p className='p-3'> Nobody will be able to contact you for this service.</p></h1>
      <div className='max-w-4xl my-5 flex flex-row justify-between'>
      <Button className='w-[40%] bg-red-800 hover:bg-red-700' onClick={()=>handleDelete()}>Yes</Button>
      <Button className='w-[40%] bg-green-800 hover:bg-green-700' onClick={()=>navigate('/profile')}>No</Button>
      </div>
     </div>
    </div>
  )
}
