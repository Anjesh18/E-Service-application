import { createSlice } from "@reduxjs/toolkit";

const serviceSlice=createSlice({
    name:"service",
    initialState:{
        services:[],
        singleService:null,
        servicesForSingleProvider:[]
    },
    reducers:{
        setServices:(state,action)=>{
            state.services=action.payload
        },
        setSingleService:(state,action)=>{
            state.singleService=action.payload
        },
        setServicesForSingleProvider:(state,action)=>{
            state.servicesForSingleProvider=action.payload
        }
    }
})

export const {setServices, setSingleService, setServicesForSingleProvider}=serviceSlice.actions
export default serviceSlice.reducer;