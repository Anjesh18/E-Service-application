import CategoryCarousel from '@/components/shared/CategoryCarousel'
import HeroSection from '@/components/shared/HeroSection'
import Navbar from '@/components/shared/Navbar'
import ServiceCards from '@/components/shared/ServiceCards'
import GetAllServices from '@/utils/GetAllServices'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    GetAllServices()
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <ServiceCards/>
    </div>
  )
}
