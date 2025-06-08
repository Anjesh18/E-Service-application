import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ServiceSlice from "./ServiceSlice";
import ApplicantSlice from './ApplicantSlice'

const store=configureStore({
    reducer:{
        auth:AuthSlice,
        service: ServiceSlice,
        applicant: ApplicantSlice
    }
})

export default store;