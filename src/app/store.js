import { configureStore } from "@reduxjs/toolkit";
import socialReducer from '../features/socialSlice'
import authReducer from '../features/authSlice'
export const store = configureStore({
    reducer:{
        social:socialReducer,
        auth : authReducer
    }
})