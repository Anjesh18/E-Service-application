import { createSlice } from "@reduxjs/toolkit";

const applicantSlice=createSlice({
    name:"applicant",
    initialState:{
        applicants:[],
        approvedApplicants:[]
    },
    reducers:{
        setApplicants:(state,action)=>{
            state.applicants=action.payload
        },
        setApprovedApplicants:(state,action)=>{
            state.approvedApplicants=action.payload
        }
    }
})

export const {setApplicants, setApprovedApplicants}=applicantSlice.actions
export default applicantSlice.reducer