import { configureStore } from "@reduxjs/toolkit";
import socialReducer from '../features/socialSlice'
import authReducer from '../features/authSlice'
import propertyReducer from '../features/propertySlice'
import mapReducer from '../features/mapSlice'

export const store = configureStore({
    reducer:{
        social:socialReducer,
        auth : authReducer,
        properties: propertyReducer,
        map:mapReducer
    }
})