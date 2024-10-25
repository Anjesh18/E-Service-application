import ApplicantDetails from '@/components/shared/ApplicantDetails'
import { setApplicants } from '@/redux/ApplicantSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ViewApplicants() {
    const {id}=useParams()
    const serviceId=id
    // const dispatch=useDispatch
    const {applicants}=useSelector(store=>store.applicant)
    
  return (
    <div className='justify-center'>
     <p className='text-lg font-semibold'>The interested applicants for this particular service are:</p> 
      {console.log(applicants?.application)}
      <ApplicantDetails/>
    </div>
  )
}
