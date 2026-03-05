import { configureStore } from "@reduxjs/toolkit";
import socialReducer from '../features/socialSlice'
export const store = configureStore({
    reducer:{
        social:socialReducer
    }
})