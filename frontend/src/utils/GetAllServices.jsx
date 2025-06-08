import { setServices } from '@/redux/ServiceSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function GetAllServices() {
    const dispatch=useDispatch()
  useEffect(()=>{
    const fetchAllServices=async()=>{
        const response=await axios.get('http://localhost:8888/api/service/getServices',{
            withCredentials: true
        })
        if(response.data.success){
            console.log(response.data.services)
            dispatch(setServices(response.data.services))
        }else{
            console.log(error)
        }
    }
    fetchAllServices()
  },[])
}
