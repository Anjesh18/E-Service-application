import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ServiceSlice from "./ServiceSlice";

const store=configureStore({
    reducer:{
        auth:AuthSlice,
        service: ServiceSlice
    }
})

export default store;