import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setUser } from '@/redux/AuthSlice'
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate=useNavigate()
    const [data,setData]=useState({
        email:"",
        password:""
    })
    const dispatch=useDispatch()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response=await axios.post('http://localhost:8888/api/users/login', data, {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true
        })

        if(response.data.success==true){
           
            dispatch(setUser(response.data.loggedinUser))
            navigate('/')
        }
    }
  return (
    <div>
      <Navbar/>
      <div className='flex items-center justify-center max-w-7xl mx-auto mt-14'>
      <form onSubmit={handleSubmit} className="w-1/2 items-center border border-gray-400 rounded-lg shadow-xl p-5" >
        <h1 className='text-2xl font-bold my-3'>Signin</h1>
       
        <div className="my-4">
          <Label className='text-md py-5'>Email</Label>
          <Input placeholder="Enter email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} type="email"/>
        </div>
        
        <div className="my-4">
          <Label className='text-md py-5'>Password</Label>
          <Input placeholder="Enter password" value={data.password} onChange={e=>setData({...data,password:e.target.value})} type="password"/>
        </div>
        
        <div className="my-4">
          <Button className='w-full' type="submit">Login</Button>
        </div>
        <span className='my-4'>Don't have an acount?<Link to='/register' className='text-blue-600'>Register</Link></span>
      </form>
      </div>
    </div>
  )
}
