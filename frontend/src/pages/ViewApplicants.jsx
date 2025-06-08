import ApplicantDetails from '@/components/shared/ApplicantDetails'
import { setApplicants } from '@/redux/ApplicantSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function ViewApplicants() {
const dispatch=useDispatch
    const {id}=useParams()
    const serviceId=id
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/api/application/get/${serviceId}`, { withCredentials: true });
        if (response.data.success) {
          console.log(response.data.application);
          dispatch(setApprovedApplicants(response.data.applications));
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants()
  },[id,dispatch])
     
    const {applicants}=useSelector(store=>store.applicant)
    
  return (
    <div className='justify-center'>
     <p className='text-lg font-semibold'>The interested applicants for this particular service are:</p> 
     {console.log(applicants?.application)}
      <ApplicantDetails/>
    </div>
  )
}
