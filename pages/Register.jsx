import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'


export default function Register() {
    const [data,setData]=useState({
        fullname:"",
        phoneNumber:"",
        email:"",
        password:"",
        file:""
    })
    
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()

        const formData= new FormData()
    formData.append("fullname", data.fullname)
    formData.append("email",data.email)
    formData.append("phoneNumber",data.phoneNumber)
    formData.append("password",data.password)
    if(data.file){
      formData.append("file",data.file)
    }
    
       try {
        const response=await axios.post('http://localhost:8888/api/users/register',formData, {
          headers:{
              "Content-Type":"multipart/form-data"
          },
          withCredentials:true
      })

      if(response.data.success==true){
          console.log(response.data.message)
          navigate('/login')
          toast(response.data.message)
      }
      else{
        toast(response.data.error)
      }

       } catch (error) {
        
       }
    }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto mt-14'>
      <form onSubmit={handleSubmit} className="w-1/2 items-center border border-gray-400 rounded-lg shadow-xl p-5" >
        <h1 className='text-2xl font-bold my-3'>Signup</h1>
        <div className='my-4'>
          <Label className='text-md py-5'>Fullname</Label>
          <Input placeholder="Enter fullname" value={data.fullname} onChange={e=>setData({...data,fullname:e.target.value})} type="text"/>
        </div>
        <div className="my-4">
          <Label className='text-md py-5'>Email</Label>
          <Input placeholder="Enter email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} type="email"/>
        </div>
        <div className="my-4">
          <Label className='text-md py-5'>Phone Number</Label>
          <Input placeholder="Enter phone number" value={data.phoneNumber} onChange={e=>setData({...data,phoneNumber:e.target.value})} type="text"/>
        </div>
        <div className="my-4">
          <Label className='text-md py-5'>Password</Label>
          <Input placeholder="Enter password" value={data.password} onChange={e=>setData({...data,password:e.target.value})} type="password"/>
        </div>
        <div className="my-4">
          <Label className='text-md py-5 mr-10'>Profile Picture</Label>
           <input type="file" accept="image/*" onChange={e=>setData({...data,file:e.target.files?.[0]})}/>
        </div>
        <div className="my-4">
          <Button className='w-full' type="submit">Register</Button>
        </div>
        <span className='my-4'>Already have an acount?<Link to='/login' className='text-blue-600'>Login</Link></span>
      </form>
      </div>
    </div>
  )
}
