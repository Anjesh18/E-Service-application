import React, { useEffect } from 'react'
import SingleServiceCard from './SingleServiceCard'
import axios from 'axios'
import { useSelector } from 'react-redux'


export default function ServiceCards() {
    const {services}=useSelector(store=>store.service)
   
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='font-extrabold underline text-3xl'>Latest available services</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {
            services.length<1?<div><span>No services available to display !</span></div>:
                services.map((service)=>{
                       return  <SingleServiceCard key={service._id} service={service}/>
                })
            
        }
      </div>
    </div>
  )
}
